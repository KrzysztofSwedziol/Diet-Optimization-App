create table if not exists products (
    id              bigserial primary key,
    name            text not null,
    unit_name       text,
    unit_symbol     text,
    grams_per_unit  double precision,
    kcal_100g       double precision,
    protein_100g    double precision,
    carbs_100g      double precision,
    fat_100g        double precision
);
