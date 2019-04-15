CREATE TABLE "tags" (
    "id" SERIAL PRIMARY KEY,
    "name" varchar(255) NOT NULL
);

CREATE TABLE "projects" (
    "id" SERIAL PRIMARY KEY,
    "name" varchar(255) NOT NULL,
    "description" varchar(2048),
    "thumbnail" varchar(2048), 
    "website" varchar(2048),
    "github" varchar(2048),
    "date_completed" date,
    "tag_id" INT REFERENCES "tags"
);

INSERT INTO "tags" ("name") 
VALUES ('React'), ('jQuery'), ('Node'), ('SQL'), ('Redux'), ('HTML');

SELECT "projects"."id", "projects"."name", "projects"."description", "projects"."thumbnail", "projects"."website", "projects"."github", "projects"."date_completed", "projects"."tag_id", "tags"."name" AS "tag_name" FROM "projects"
JOIN "tags" ON "projects"."tag_id" = "tags"."id";

-- test data
INSERT INTO "projects" ("name", "description", "thumbnail", "website", "github", "date_completed", "tag_id") VALUES ( 'Test Project', 'Test description is this stuff in here.', 'https://r.hswstatic.com/w_907/gif/tesla-cat.jpg', 'http://www.rachelpeddie.com/', 'https://github.com/rachelpeddie/saga-fruit-basket-activity', '2019-04-12', '1');

INSERT INTO "projects" ("name", "description", "thumbnail", "website", "github", "date_completed", "tag_id") VALUES ( 'Test Project 2', 'Other test description is this stuff in here.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpOVTJa3oSXDK99HOv4ClhlGCRZRCIuKVvOg38e6bFekxe_pR_bg', 'http://www.rachelpeddie.com/', 'https://github.com/rachelpeddie/giphy-api-activity', '2019-04-10', '3');

SELECT * FROM "tags";