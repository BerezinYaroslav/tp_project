--liquibase formatted sql

--changeset id:1 author:yberezin
insert into users (name, age, email, password)
values ('admin', 21, 'yberezin@cinimex.ru', '1234');