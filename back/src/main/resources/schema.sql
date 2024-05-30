drop table if exists users, lists, tasks, tags, tasks_tags cascade;

create table users
(
    id       bigint generated always as identity primary key,
    name     varchar(50) not null unique,
    age      int check (age > 0),
    check (age < 150),
    email    varchar(50) not null,
    password varchar(50) not null
);

create table lists
(
    id       bigint generated always as identity primary key,
    name     varchar(50) not null unique,
    owner_id bigint      references users (id) on delete set null
);

create table tasks
(
    id            bigint generated always as identity primary key,
    name          varchar(50) not null unique,
    owner_id      bigint      references users (id) on delete set null,
    creation_date timestamp,
    finish_date   timestamp,
    is_done       boolean default false,
    list_id       bigint      references lists (id) on delete set null,
    parent_id     bigint      references tasks (id) on delete set null,
    priority      int
);

create table tags
(
    id         bigint generated always as identity primary key,
    name       varchar(50) not null unique,
    color      varchar(10) default '#ffffff',
    creator_id bigint      references users (id) on delete set null
);

create table tasks_tags
(
    task_id bigint references tasks (id) on delete set null,
    tag_id  bigint references tags (id) on delete set null
);
