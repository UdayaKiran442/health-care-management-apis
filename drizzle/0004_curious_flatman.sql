CREATE TABLE "notes" (
	"note_id" varchar PRIMARY KEY NOT NULL,
	"appointment_id" varchar NOT NULL,
	"content" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
