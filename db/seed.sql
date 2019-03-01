CREATE TABLE "public"."users" (
    "id" serial,
    "username" varchar(20),
    "password" varchar(20),
    "profile_pic" text,
    PRIMARY KEY ("id")
);


CREATE TABLE "public"."posts" (
    "id" serial,
    "title" varchar(45),
    "img" text,
    "content" text,
    "author_id" integer,
    PRIMARY KEY ("id"),
    CONSTRAINT "author_id" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id")
);

INSERT INTO "public"."posts"("title", "img", "content", "author_id") VALUES('test', 'https://robohash.org/G6P.png?set=set4&size=150x150', 'test message', 1) RETURNING "id", "title", "img", "content", "author_id";
INSERT INTO "public"."posts"("title", "img", "content", "author_id") VALUES('second ', 'https://robohash.org/G6P.png?set=set4&size=150x150', 'second message', 2) RETURNING "id", "title", "img", "content", "author_id";
INSERT INTO "public"."posts"("title", "img", "content", "author_id") VALUES('message ', 'https://robohash.org/G6P.png?set=set4&size=150x150', 'another message', 3) RETURNING "id", "title", "img", "content", "author_id";


//////////////////////////////////////////////////////////////////////////////

QUERIES

True AND search String

select posts.id as post_id, title, img, content, author_id, username
from posts 
inner join users on author_id = users.id
WHERE title like '%ess%' AND author_id = 1;

false and no string

select posts.id as post_id, title, img, content, author_id, username
from posts 
inner join users on author_id = users.id
WHERE author_id != 1;

FALSE AND STRING

select posts.id as post_id, title, img, content, author_id, username
from posts 
inner join users on author_id = users.id
WHERE title like '%ess%' author_id != 1;

TRUE AND NO string

select posts.id as post_id, title, img, content, author_id, username
from posts 
inner join users on author_id = users.id
WHERE posts.id > 0
