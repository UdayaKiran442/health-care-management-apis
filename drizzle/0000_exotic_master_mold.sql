CREATE TABLE "admin" (
	"admin_id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"password_hash" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "admin_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "doctor" (
	"doctor_id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"password_hash" varchar NOT NULL,
	"specialization" varchar NOT NULL,
	"department" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "doctor_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "patient" (
	"patient_id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"password_hash" varchar NOT NULL,
	"date_of_birth" timestamp NOT NULL,
	"phone" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "patient_email_unique" UNIQUE("email")
);
