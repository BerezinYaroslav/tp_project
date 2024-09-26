--liquibase formatted sql

--changeset id:1 author:yberezin
insert into users (name, age, email, password)
values ('admin', 21, 'yberezin@cinimex.ru', '1234');

--changeset id:2 author:yberezin
insert into tasks (name, description, owner_id, creation_date, finish_date, is_done, list_id, parent_id, priority)
values ('test task', 'test task description', 1, '2024-09-26', '2024-09-26', false, null, null, 1);