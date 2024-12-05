--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4
-- Dumped by pg_dump version 16.4

-- Started on 2024-12-05 15:14:14 MST

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
-- TOC entry 218 (class 1259 OID 16456)
-- Name: ingredients; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ingredients (
    quantity integer,
    ingredientname character(50) NOT NULL,
    measurement character(20),
    recipeid character(11) NOT NULL
);


ALTER TABLE public.ingredients OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16441)
-- Name: makes_a; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.makes_a (
    userid character(11),
    recipeid character(11) NOT NULL
);


ALTER TABLE public.makes_a OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16434)
-- Name: recipes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.recipes (
    recipeid character(11) NOT NULL,
    name character(100),
    directions character(5000),
    cuisine character(300),
    difficulty integer
);


ALTER TABLE public.recipes OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16429)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    userid character(11) NOT NULL,
    password character(30),
    email character(320),
    name character(50)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 4308 (class 0 OID 16456)
-- Dependencies: 218
-- Data for Name: ingredients; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ingredients (quantity, ingredientname, measurement, recipeid) FROM stdin;
200	Pasta                                             	grams               	recipe001  
100	Cream                                             	ml                  	recipe001  
2	Eggs                                              	pieces              	recipe002  
1	Salt                                              	tsp                 	recipe002  
1	Pepper                                            	tsp                 	recipe002  
2	Bread                                             	slices              	recipe003  
1	Cheese                                            	slice               	recipe003  
1	Butter                                            	tbsp                	recipe003  
100	Romaine Lettuce                                   	grams               	recipe004  
50	Croutons                                          	grams               	recipe004  
30	Grated Parmesan                                   	grams               	recipe004  
2	Dressing                                          	tbsp                	recipe004  
\.


--
-- TOC entry 4307 (class 0 OID 16441)
-- Dependencies: 217
-- Data for Name: makes_a; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.makes_a (userid, recipeid) FROM stdin;
00001      	recipe001  
00002      	recipe002  
00003      	recipe003  
00004      	recipe004  
\.


--
-- TOC entry 4306 (class 0 OID 16434)
-- Dependencies: 216
-- Data for Name: recipes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.recipes (recipeid, name, directions, cuisine, difficulty) FROM stdin;
recipe002  	Scrambled Eggs                                                                                      	Crack eggs, whisk with salt and pepper, cook on medium heat, stirring until set.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        	American                                                                                                                                                                                                                                                                                                    	1
recipe003  	Grilled Cheese                                                                                      	Butter the bread, add cheese between slices, cook on medium heat until golden brown.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    	American                                                                                                                                                                                                                                                                                                    	1
recipe004  	Caesar Salad                                                                                        	Toss lettuce with dressing, croutons, and grated cheese.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                	Mediterranean                                                                                                                                                                                                                                                                                               	1
recipe001  	Pasta Alfredo                                                                                       	Boil pasta, Make Alfredo sauce, Mix and serve.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          	Italian                                                                                                                                                                                                                                                                                                     	3
849273     	Tomato Soup                                                                                         	Just blend tomatoes or something                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        	Soup                                                                                                                                                                                                                                                                                                        	1
\.


--
-- TOC entry 4305 (class 0 OID 16429)
-- Dependencies: 215
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (userid, password, email, name) FROM stdin;
00002      	abcde                         	tlam17@asu.edu                                                                                                                                                                                                                                                                                                                  	Tyler Lam                                         
00003      	abcde                         	jagar112@asu.edu                                                                                                                                                                                                                                                                                                                	Jorge Garcia                                      
00004      	abcde                         	otchoy@asu.edu                                                                                                                                                                                                                                                                                                                  	Orion Choy                                        
00001      	abcdef                        	cmcamac3@asu.edu                                                                                                                                                                                                                                                                                                                	Cole Camacho                                      
angel12    	cats123                       	angelaor@gmail.com                                                                                                                                                                                                                                                                                                              	Gorald                                            
321        	321                           	321@321                                                                                                                                                                                                                                                                                                                         	321                                               
\.


--
-- TOC entry 4158 (class 2606 OID 16460)
-- Name: ingredients ingredients_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingredients
    ADD CONSTRAINT ingredients_pkey PRIMARY KEY (recipeid, ingredientname);


--
-- TOC entry 4156 (class 2606 OID 16445)
-- Name: makes_a makes_a_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.makes_a
    ADD CONSTRAINT makes_a_pkey PRIMARY KEY (recipeid);


--
-- TOC entry 4154 (class 2606 OID 16440)
-- Name: recipes recipes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_pkey PRIMARY KEY (recipeid);


--
-- TOC entry 4152 (class 2606 OID 16433)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (userid);


--
-- TOC entry 4161 (class 2606 OID 16461)
-- Name: ingredients ingredients_recipeid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingredients
    ADD CONSTRAINT ingredients_recipeid_fkey FOREIGN KEY (recipeid) REFERENCES public.recipes(recipeid) ON DELETE CASCADE;


--
-- TOC entry 4159 (class 2606 OID 16451)
-- Name: makes_a makes_a_recipeid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.makes_a
    ADD CONSTRAINT makes_a_recipeid_fkey FOREIGN KEY (recipeid) REFERENCES public.recipes(recipeid);


--
-- TOC entry 4160 (class 2606 OID 16446)
-- Name: makes_a makes_a_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.makes_a
    ADD CONSTRAINT makes_a_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(userid);


-- Completed on 2024-12-05 15:14:17 MST

--
-- PostgreSQL database dump complete
--

