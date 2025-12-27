Write-Host "[*] Stopping all containers..."
$containers = docker ps -aq
if ($containers) {
    docker stop $containers
}

Write-Host "[*] Removing all containers..."
if ($containers) {
    docker rm -f $containers
}

Write-Host "[*] Removing all images..."
$images = docker images -q
if ($images) {
    docker rmi -f $images
}

Write-Host "[*] Removing all volumes..."
$volumes = docker volume ls -q
if ($volumes) {
    docker volume rm $volumes
}

Write-Host "[*] Removing all networks (except default ones)..."
$networks = docker network ls --format "{{.ID}} {{.Name}}" |
        Where-Object { $_ -notmatch "bridge|host|none" } |
        ForEach-Object { $_.Split(" ")[0] }

if ($networks) {
    docker network rm $networks
}

Write-Host "[*] Pruning build cache..."
docker builder prune -af

Write-Host "[*] Pruning system..."
docker system prune -af --volumes

Write-Host "[*] Docker reduced to cosmic dust."
