--
-- PostgreSQL database dump
--

-- Dumped from database version 16.0
-- Dumped by pg_dump version 16.0

-- Started on 2024-04-18 22:39:30

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE stride;
--
-- TOC entry 4869 (class 1262 OID 16970)
-- Name: stride; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE stride WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';


ALTER DATABASE stride OWNER TO postgres;

\connect stride

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 218 (class 1259 OID 16988)
-- Name: list; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.list (
    list_id bigint NOT NULL,
    name character varying(50) NOT NULL,
    creator_id bigint NOT NULL
);


ALTER TABLE public.list OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16971)
-- Name: tag; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tag (
    tag_id bigint NOT NULL,
    name character varying(50)[] NOT NULL,
    color character varying(10),
    creator_id bigint NOT NULL
);


ALTER TABLE public.tag OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 17008)
-- Name: task; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.task (
    task_id bigint NOT NULL,
    name character varying(50) NOT NULL,
    description character varying(250),
    creator_id bigint NOT NULL,
    creation_date date DEFAULT CURRENT_TIMESTAMP NOT NULL,
    finish_date date NOT NULL,
    is_done boolean DEFAULT false NOT NULL,
    list_id bigint,
    parent_id bigint,
    priority integer
);


ALTER TABLE public.task OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16978)
-- Name: task_tag; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.task_tag (
    task_id bigint NOT NULL,
    tag_id bigint NOT NULL
);


ALTER TABLE public.task_tag OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16981)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id bigint NOT NULL,
    name character varying(50)[] NOT NULL,
    age integer,
    email character varying(50) NOT NULL,
    password character varying(50) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 4711 (class 2606 OID 16992)
-- Name: list list_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.list
    ADD CONSTRAINT list_pkey PRIMARY KEY (list_id);


--
-- TOC entry 4707 (class 2606 OID 16977)
-- Name: tag tag_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tag
    ADD CONSTRAINT tag_pkey PRIMARY KEY (tag_id);


--
-- TOC entry 4705 (class 2606 OID 17030)
-- Name: task task_id; Type: CHECK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE public.task
    ADD CONSTRAINT task_id CHECK (((task_id <> parent_id) OR (parent_id IS NULL))) NOT VALID;


--
-- TOC entry 4713 (class 2606 OID 17012)
-- Name: task task_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT task_pkey PRIMARY KEY (task_id);


--
-- TOC entry 4709 (class 2606 OID 16987)
-- Name: users user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_pkey PRIMARY KEY (user_id);


--
-- TOC entry 4717 (class 2606 OID 16998)
-- Name: list list_users_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.list
    ADD CONSTRAINT list_users_fkey FOREIGN KEY (creator_id) REFERENCES public.users(user_id) ON DELETE CASCADE NOT VALID;


--
-- TOC entry 4715 (class 2606 OID 16993)
-- Name: task_tag tag_task_tag_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task_tag
    ADD CONSTRAINT tag_task_tag_fkey FOREIGN KEY (tag_id) REFERENCES public.tag(tag_id) ON DELETE CASCADE NOT VALID;


--
-- TOC entry 4714 (class 2606 OID 17003)
-- Name: tag tag_users_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tag
    ADD CONSTRAINT tag_users_fkey FOREIGN KEY (creator_id) REFERENCES public.users(user_id) ON DELETE CASCADE NOT VALID;


--
-- TOC entry 4718 (class 2606 OID 17020)
-- Name: task task_list_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT task_list_fkey FOREIGN KEY (list_id) REFERENCES public.list(list_id) ON DELETE CASCADE NOT VALID;


--
-- TOC entry 4719 (class 2606 OID 17025)
-- Name: task task_subtask_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT task_subtask_fkey FOREIGN KEY (parent_id) REFERENCES public.task(task_id) ON DELETE CASCADE NOT VALID;


--
-- TOC entry 4716 (class 2606 OID 17031)
-- Name: task_tag task_tag_task_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task_tag
    ADD CONSTRAINT task_tag_task_fkey FOREIGN KEY (task_id) REFERENCES public.task(task_id) ON DELETE CASCADE NOT VALID;


--
-- TOC entry 4720 (class 2606 OID 17015)
-- Name: task task_users_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT task_users_fkey FOREIGN KEY (creator_id) REFERENCES public.users(user_id) ON DELETE CASCADE NOT VALID;


-- Completed on 2024-04-18 22:39:31

--
-- PostgreSQL database dump complete
--

