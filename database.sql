CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (50) NOT NULL,
	"description" VARCHAR (255) NOT NULL,
	"status" BOOLEAN
	);
