CREATE TABLE IF NOT EXISTS "user" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "email" character varying NOT NULL,
    "password" character varying NOT NULL,
    "role" integer NOT NULL DEFAULT 0
);

INSERT INTO "user" ("email", "password", "role") VALUES ('admin1@g.com', '301293255123930e.95b6cc66b05f907028cd1516e7cf4536651e75d635e67ad4bb2bce45a0bb6d1f', 1);
INSERT INTO "user" ("email", "password", "role") VALUES ('admin2@g.com', '301293255123930e.95b6cc66b05f907028cd1516e7cf4536651e75d635e67ad4bb2bce45a0bb6d1f', 1);