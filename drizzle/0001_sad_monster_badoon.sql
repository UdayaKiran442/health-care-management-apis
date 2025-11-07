CREATE TABLE "user" (
	"user_id" varchar PRIMARY KEY NOT NULL,
	"role" varchar NOT NULL,
	"email" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
