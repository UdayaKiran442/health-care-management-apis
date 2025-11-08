CREATE TABLE "appointments" (
	"appointment_id" varchar PRIMARY KEY NOT NULL,
	"patient_id" varchar NOT NULL,
	"doctor_id" varchar NOT NULL,
	"appointment_date" timestamp NOT NULL,
	"status" varchar NOT NULL,
	"reason_for_visit" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
