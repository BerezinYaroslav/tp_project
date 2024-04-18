drop table if exists tasks;

create table tasks
(
    id   bigint generated always as identity primary key,
    name nvarchar unique not null
);