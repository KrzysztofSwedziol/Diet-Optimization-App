#!/bin/bash

# Usage: ./free_ports_unix.sh -c 10 [-r] [-u 1|0] [-v 1|0]
# -c Count (default 10)
# -r Randomize candidate order
# -u Include UDP checks (default 1)
# -v Verify bind by trying to open TCP+UDP sockets (default 1)

COUNT=10
RANDOMIZE=0
INCLUDE_UDP=1
VERIFY_BIND=1

while getopts "c:ru:v:" opt; do
  case $opt in
    c) COUNT=$((OPTARG));;
    r) RANDOMIZE=1;;
    u) INCLUDE_UDP=$((OPTARG));;
    v) VERIFY_BIND=$((OPTARG));;
    *) echo "Usage: $0 -c COUNT [-r] [-u 1|0] [-v 1|0]"; exit 2;;
  esac
done

RANGE_START=49152
RANGE_END=65535
OUTFILE="$(pwd)/free_ports.txt"

# Check python availability (we use it for bind tests)
PYTHON=""
for p in python3 python; do
  if command -v "$p" >/dev/null 2>&1; then
    PYTHON="$p"
    break
  fi
done

if [[ $VERIFY_BIND -eq 1 && -z $PYTHON ]]; then
  echo "Warning: python not found; disabling bind verification." >&2
  VERIFY_BIND=0
fi

# ---- helpers ----

# get listening TCP ports (returns newline-separated ports)
get_listening_tcp() {
  if command -v ss >/dev/null 2>&1; then
    ss -ltn 2>/dev/null | awk 'NR>1 { gsub(/.*:/,"",$4); sub(/[^0-9].*/,"",$4); if ($4!="") print $4 }' | sort -nu
  elif command -v lsof >/dev/null 2>&1; then
    lsof -nP -iTCP -sTCP:LISTEN 2>/dev/null | awk 'NR>1{ sub(/.*:/,"",$9); sub(/->.*/,"",$9); print $9 }' | grep -E '^[0-9]+$' | sort -nu
  else
    netstat -ltn 2>/dev/null | awk 'NR>2 { gsub(/.*:/,"",$4); sub(/[^0-9].*/,"",$4); if ($4!="") print $4 }' | sort -nu
  fi
}

# get listening UDP ports
get_listening_udp() {
  if command -v ss >/dev/null 2>&1; then
    ss -lun 2>/dev/null | awk 'NR>1 { gsub(/.*:/,"",$4); sub(/[^0-9].*/,"",$4); if ($4!="") print $4 }' | sort -nu
  elif command -v lsof >/dev/null 2>&1; then
    lsof -nP -iUDP 2>/dev/null | awk 'NR>1 { sub(/.*:/,"",$9); print $9 }' | grep -E '^[0-9]+$' | sort -nu
  else
    netstat -lun 2>/dev/null | awk 'NR>2 { gsub(/.*:/,"",$4); sub(/[^0-9].*/,"",$4); if ($4!="") print $4 }' | sort -nu
  fi
}

# get docker published ports
get_docker_ports() {
  if command -v docker >/dev/null 2>&1; then
    docker ps --format '{{.Ports}}' 2>/dev/null | \
      grep -Eo '([0-9]{1,5})(?=\s*->)|([0-9]{1,5})(?=->)' || true
  fi
}

# get reserved local ports (Linux sysctl). macOS doesn't have this; ignore if missing.
get_reserved_ports() {
  if command -v sysctl >/dev/null 2>&1; then
    val=$(sysctl -n net.ipv4.ip_local_reserved_ports 2>/dev/null || echo "")
    if [[ -n "$val" ]]; then
      # can be comma separated ranges like "1000,2000-2010"
      echo "$val" | tr ',' '\n' | sed 's/^[[:space:]]*//;s/[[:space:]]*$//' | awk -F- '{ if ($2=="") print $1; else { for(i=$1;i<=$2;i++) print i } }'
      return
    fi
  fi
  # fallback: nothing
  return
}

# verify bind for a port (returns 0 OK, 1 FAIL)
verify_bind() {
  local port=$1
  # use python to attempt to bind TCP and UDP on 127.0.0.1
  "$PYTHON" - "$port" <<'PY' >/dev/null 2>&1
import sys, socket, time
port = int(sys.argv[1])
ok = True
# TCP
try:
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 0)
    s.bind(("127.0.0.1", port))
    s.listen(1)
    s.close()
except Exception:
    ok = False
# UDP (if requested we will check; caller decides)
try:
    u = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    u.bind(("127.0.0.1", port))
    u.close()
except Exception:
    ok = False
sys.exit(0 if ok else 1)
PY
  return $?
}

# ---- collect used ports ----
declare -A used=()
while IFS= read -r p; do used["$p"]=1; done < <(get_listening_tcp || true)
if [[ $INCLUDE_UDP -eq 1 ]]; then
  while IFS= read -r p; do used["$p"]=1; done < <(get_listening_udp || true)
fi
while IFS= read -r p; do used["$p"]=1; done < <(get_docker_ports || true)

# reserved / excluded ports
reserved_set=()
while IFS= read -r p; do reserved_set+=("$p"); done < <(get_reserved_ports || true)
for p in "${reserved_set[@]}"; do used["$p"]=1; done

# ---- candidates ----
mapfile -t candidates < <(seq $RANGE_START $RANGE_END)

if [[ $RANDOMIZE -eq 1 ]]; then
  if command -v shuf >/dev/null 2>&1; then
    mapfile -t candidates < <(printf '%s\n' "${candidates[@]}" | shuf)
  else
    # fallback naive shuffle
    awk 'BEGIN{srand();} {print rand() " " $0}' < <(printf '%s\n' "${candidates[@]}") | sort -k1,1n | cut -d' ' -f2-
    mapfile -t candidates < <(awk 'BEGIN{srand();} {print rand() " " $0}' < <(printf '%s\n' "${candidates[@]}") | sort -k1,1n | cut -d' ' -f2-)
  fi
fi

found=()
for port in "${candidates[@]}"; do
  # speed micro-optimization
  [[ ${#found[@]} -ge $COUNT ]] && break

  # skip if marked used/reserved
  if [[ -n "${used[$port]:-}" ]]; then
    continue
  fi

  # if verify bind requested, try to bind
  if [[ $VERIFY_BIND -eq 1 ]]; then
    if ! verify_bind "$port"; then
      continue
    fi
  fi

  found+=("$port")
done

# ---- output exactly as requested ----
if [[ ${#found[@]} -eq 0 ]]; then
  echo "No clean ports found in range ${RANGE_START}-${RANGE_END}" >"$OUTFILE"
  echo "No clean ports found in range ${RANGE_START}-${RANGE_END}"
  exit 2
fi

# first line: first port only
{
  echo "${found[0]}"
  for p in "${found[@]}"; do
    echo "$p"
  done
} | tee "$OUTFILE"
