-- PRODUCTS
create table if not exists products (
    id              bigserial primary key,
    name            text not null,
    unit_id         bigint not null,
    grams_per_unit  double precision,
    kcal_100g       double precision,
    protein_100g    double precision,
    carbs_100g      double precision,
    fat_100g        double precision,
    owner_id        bigint
);


-- PLANS
create table if not exists plans (
     id                bigserial primary key,
     name              text not null,
     description       text,
     calories_target   double precision,
     proteins_target   double precision,
     carbs_target      double precision,
     fats_target       double precision,
     calories          double precision,
     proteins          double precision,
     carbs             double precision,
     fats              double precision,
     owner_id          bigint
);

-- PLAN_PRODUCT
create table if not exists plan_product (
    plan_id     bigint not null,
    product_id  bigint not null,
    quantity    double precision not null,
    primary key (plan_id, product_id)
);

-- PLANS_RECIPES
create table if not exists plans_recipes (
     plan_id   bigint not null,
     recipe_id bigint not null,
     primary key (plan_id, recipe_id)
);

-- PRODUCT_PREFERENCE
create table if not exists product_preference (
    owner_id   bigint not null,
    product_id bigint not null,
    preference double precision not null,
    primary key (owner_id, product_id)
);

-- RECIPES
create table if not exists recipes (
    id           bigserial primary key,
    recipe_name  text,
    description  text,
    steps        text,
    creator_id   bigint
);

-- RECIPES_PRODUCTS
create table if not exists recipes_products (
    recipe_id    bigint not null,
    product_id   bigint not null,
    quantity     double precision,
    portion_type text,
    primary key (recipe_id, product_id)
);

-- UNIT
create table if not exists unit (
    id      bigserial primary key,
    name    text not null,
    symbol  text
);

-- USERS
create table if not exists users (
     id           bigserial primary key,
     username     text,
     email        text,
     password     text,
     age          integer,
     gender       text,
     height       integer,
     weight       integer,
     energy_req   integer,
     protein_req  integer,
     carbs_req    integer,
     fat_req      integer,
     role         text
);

-- Adding foreign key constraints to enforce relationships between tables
alter table products add foreign key (unit_id) references unit(id);
alter table products add foreign key (owner_id) references users(id);

alter table plans add foreign key (owner_id) references users(id);

alter table plan_product add foreign key (plan_id) references plans(id);
alter table plan_product add foreign key (product_id) references products(id);

alter table product_preference add foreign key (owner_id) references users(id);
alter table product_preference add foreign key (product_id) references products(id);

alter table recipes add foreign key (creator_id) references users(id);

alter table recipes_products add foreign key (recipe_id) references recipes(id);
alter table recipes_products add foreign key (product_id) references products(id);

alter table plans_recipes add foreign key (plan_id) references plans(id);
alter table plans_recipes add foreign key (recipe_id) references recipes(id);
