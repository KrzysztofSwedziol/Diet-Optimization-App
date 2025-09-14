#!/bin/sh
# wypociny, żeby hasło dev mógl se wchodzić

set -eu
HBA="$PGDATA/pg_hba.conf"


GW="$(ip route | awk '/default/ {print $3}' || true)"

if [ -n "${GW:-}" ] && ! grep -qE "^host[[:space:]]+all[[:space:]]+all[[:space:]]+${GW}/32[[:space:]]+trust$" "$HBA"; then
  echo "host all all ${GW}/32 trust" >> "$HBA"
  echo "[hba] Added trust for Docker gateway ${GW}/32"
fi


grep -qE "^host[[:space:]]+all[[:space:]]+all[[:space:]]+0\.0\.0\.0/0[[:space:]]+(scram-sha-256|md5|trust)$" "$HBA" \
  || echo "host all all 0.0.0.0/0 scram-sha-256" >> "$HBA"

pg_ctl -D "$PGDATA" reload || true
