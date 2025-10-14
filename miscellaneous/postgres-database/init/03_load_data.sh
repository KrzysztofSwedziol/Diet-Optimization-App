#!/bin/sh
# Seed units and products from JSON into PostgreSQL

trap 'st=$?; echo "[seed] ERROR at ${BASH_SOURCE##*/}:${LINENO} → ${BASH_COMMAND} (exit=$st)" >&2' ERR

DB_USER="${POSTGRES_USER:?missing POSTGRES_USER}"
DB_NAME="${POSTGRES_DB:?missing POSTGRES_DB}"
SEED_JSON="/seed/foundational_foods.json"

if [ ! -f "$SEED_JSON" ]; then
  echo "[seed] Not found $SEED_JSON, skipping."
  exit 0
fi

echo "[seed] loading UNITS (distinct name+symbol) ..."

# Stage table for units (plain table so we can \copy into it)
psql -v ON_ERROR_STOP=1 -U "$DB_USER" -d "$DB_NAME" -c "
  drop table if exists _stage_units;
  create table _stage_units (
    name   text,
    symbol text
  );
"

# JSON → TSV → _stage_units
jq -r '.[] | [(.measureUnitName // ""), (.measureUnitSymbol // "")] | @tsv' "$SEED_JSON" \
| sort -u \
| psql -v ON_ERROR_STOP=1 -U "$DB_USER" -d "$DB_NAME" \
    -c "\copy _stage_units(name, symbol) from stdin with (format text, delimiter E'\t', null '')"

# Insert only new units (avoid duplicates across runs)
psql -v ON_ERROR_STOP=1 -U "$DB_USER" -d "$DB_NAME" -c "
  insert into unit(name, symbol)
  select s.name, s.symbol
  from _stage_units s
  left join unit u
    on u.name = s.name
   and coalesce(u.symbol,'') = coalesce(s.symbol,'')
  where s.name <> '' and u.id is null;
  drop table if exists _stage_units;
"

echo "[seed] loading PRODUCTS ..."

# Stage table for products (so we can \copy then join to unit)
psql -v ON_ERROR_STOP=1 -U "$DB_USER" -d "$DB_NAME" -c "
  drop table if exists _stage_products;
  create table _stage_products (
    name            text,
    unit_name       text,
    unit_symbol     text,
    grams_per_unit  double precision,
    kcal_100g       double precision,
    protein_100g    double precision,
    carbs_100g      double precision,
    fat_100g        double precision
  );
"

# JSON → TSV → _stage_products
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
    -c "\copy _stage_products(name, unit_name, unit_symbol, grams_per_unit, kcal_100g, protein_100g, carbs_100g, fat_100g)
        from stdin with (format text, delimiter E'\t', null '')"

# Map to unit_id and insert into products (owner_id = NULL → global products)
psql -v ON_ERROR_STOP=1 -U "$DB_USER" -d "$DB_NAME" -c "
  insert into products(name, unit_id, grams_per_unit, kcal_100g, protein_100g, carbs_100g, fat_100g, owner_id)
  select
    p.name,
    u.id as unit_id,
    p.grams_per_unit,
    p.kcal_100g,
    p.protein_100g,
    p.carbs_100g,
    p.fat_100g,
    null
  from _stage_products p
  join unit u
    on u.name = p.unit_name
   and coalesce(u.symbol,'') = coalesce(p.unit_symbol,'');
  drop table if exists _stage_products;
"

echo "[seed] done."
