# helper file, has nothing to do in the app

param(
  [int] $Count = 10,
  [switch] $Random,
  [switch] $IncludeUdp = $true,
  [switch] $VerifyBind = $true
)

if (-not $PSBoundParameters.ContainsKey('IncludeUdp')) { $IncludeUdp = $true }
if (-not $PSBoundParameters.ContainsKey('VerifyBind')) { $VerifyBind = $true }

$RangeStart = 49152
$RangeEnd   = 65535

function Get-ListeningTcp {
  try {
    return (Get-NetTCPConnection -State Listen -ErrorAction Stop | Select-Object -ExpandProperty LocalPort -Unique)
  } catch {
    $out = & netstat -ano -p tcp 2>$null
    $ports = @()
    foreach ($line in $out) {
      if ($line -match '^\s*TCP\s+\S+:(\d+)\s+\S+:\d+\s+LISTENING') { $ports += [int]$matches[1] }
    }
    return $ports
  }
}

function Get-ListeningUdp {
  try {
    return (Get-NetUDPEndpoint -ErrorAction Stop | Select-Object -ExpandProperty LocalPort -Unique)
  } catch {
    $out = & netstat -ano -p udp 2>$null
    $ports = @()
    foreach ($line in $out) {
      if ($line -match '^\s*UDP\s+\S+:(\d+)\s+\*:\*') { $ports += [int]$matches[1] }
    }
    return $ports
  }
}

function Get-DockerPublishedPorts {
  $dockerPorts = @()
  if (Get-Command docker -ErrorAction SilentlyContinue) {
    try {
      $lines = & docker ps --format "{{.Ports}}" 2>$null
      foreach ($ln in $lines) {
        if ([string]::IsNullOrWhiteSpace($ln)) { continue }
        $m = [regex]::Matches($ln, '(?<=:)(\d+)(?=\s*->)')
        foreach ($x in $m) { $dockerPorts += [int]$x.Value }
      }
    } catch { }
  }
  return $dockerPorts
}

function Get-ExcludedRanges([ValidateSet('tcp','udp')]$Proto) {
  $ranges = @()
  try {
    $out = & netsh int ipv4 show excludedportrange $Proto 2>$null
    foreach ($line in $out) {
      if ($line -match '^\s*(\d+)\s*-\s*(\d+)\s*$') {
        $ranges += ,@([int]$matches[1], [int]$matches[2])
      }
    }
  } catch { }
  return $ranges
}

function Is-InExcluded($port, $ranges) {
  foreach ($r in $ranges) {
    if ($port -ge $r[0] -and $port -le $r[1]) { return $true }
  }
  return $false
}


$used = [System.Collections.Generic.HashSet[int]]::new()
foreach ($p in (Get-ListeningTcp)) { if ($p -ge $RangeStart -and $p -le $RangeEnd) { [void]$used.Add([int]$p) } }
if ($IncludeUdp) { foreach ($p in (Get-ListeningUdp)) { if ($p -ge $RangeStart -and $p -le $RangeEnd) { [void]$used.Add([int]$p) } } }
foreach ($p in (Get-DockerPublishedPorts)) { if ($p -ge $RangeStart -and $p -le $RangeEnd) { [void]$used.Add([int]$p) } }

$exTcp = Get-ExcludedRanges tcp
$exUdp = if ($IncludeUdp) { Get-ExcludedRanges udp } else { @() }

$all = $RangeStart..$RangeEnd
if ($Random) {
  $rnd = [System.Random]::new()
  $all = $all | Sort-Object { $rnd.Next() }
}

$found = New-Object System.Collections.Generic.List[int]

foreach ($port in $all) {
  if ($used.Contains($port)) { continue }
  if (Is-InExcluded $port $exTcp) { continue }
  if ($IncludeUdp -and (Is-InExcluded $port $exUdp)) { continue }

  if ($VerifyBind) {
    $tcpOk = $false
    try {
      $listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Loopback, $port)
      $listener.Server.SetSocketOption([System.Net.Sockets.SocketOptionLevel]::Socket,
                                       [System.Net.Sockets.SocketOptionName]::ExclusiveAddressUse, $true)
      $listener.Start()
      $listener.Stop()
      $tcpOk = $true
    } catch { }

    if (-not $tcpOk) { continue }

    if ($IncludeUdp) {
      $udpOk = $false
      try {
        $udp = [System.Net.Sockets.UdpClient]::new([System.Net.IPEndPoint]::new([System.Net.IPAddress]::Loopback, $port))
        $udp.Close()
        $udpOk = $true
      } catch { }
      if (-not $udpOk) { continue }
    }
  }

  $null = $found.Add($port)
  if ($found.Count -ge $Count) { break }
}

$path = Join-Path (Get-Location) "free_ports.txt"
$outLines = @()

if ($found.Count -gt 0) {
  $outLines += $found[0]
  foreach ($p in $found) { $outLines += $p }
} else {
  $outLines += "No clean ports found in range $RangeStart-$RangeEnd."
}

$outLines | Set-Content -Encoding UTF8 $path
foreach ($line in $outLines) { Write-Output $line }
