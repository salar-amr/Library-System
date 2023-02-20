CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"));

CREATE TABLE "book" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "available" boolean NOT NULL DEFAULT true, "availability" TIMESTAMP, "userId" integer, CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"));

ALTER TABLE "book" ADD CONSTRAINT "FK_04f66cf2a34f8efc5dcd9803693" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;


INSERT INTO "book" ("name", "available", "availability", "userId")
VALUES
    ('Book 1', true, null, null),
    ('Book 2', true, null, null),
    ('Book 3', true, null, null),
    ('Book 4', true, null, null),
    ('Book 5', true, null, null);

INSERT INTO "user" ("email") VALUES ('admin1@g.com');
INSERT INTO "user" ("email") VALUES ('admin2@g.com');