#!/bin/sh
# shebang taki, bo jest odpalane z wnętrza kontenera, gdzie jest normalnie linux
set -eu

DB_USER="${POSTGRES_USER:?missing POSTGRES_USER}"
DB_NAME="${POSTGRES_DB:?missing POSTGRES_DB}"
SEED_JSON="/seed/foundational_foods.json"

if [ ! -f "$SEED_JSON" ]; then
  echo "[seed] Brak $SEED_JSON, pomijam."
  return 0
fi

echo "[seed] ladowane produkty z $SEED_JSON..."

jq -r '
  .[] |
  [
    (.name // ""),
    (.measureUnitName // ""),
    (.measureUnitSymbol // ""),
    (.gramsPerUnit // null),
    (.kcal100g // null),
    (.protein100g // null),
    (.carbs100g // null),
    (.fat100g // null)
  ] | @tsv
' "$SEED_JSON" \
| psql -v ON_ERROR_STOP=1 -U "$DB_USER" -d "$DB_NAME" \
    -c "\copy products(name, unit_name, unit_symbol, grams_per_unit, kcal_100g, protein_100g, carbs_100g, fat_100g) from stdin with (format text, delimiter E'\t', null '');"

echo "[seed] Produkty zaladowane."
