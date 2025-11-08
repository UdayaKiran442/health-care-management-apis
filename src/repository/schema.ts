import { boolean, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
	userId: varchar("user_id").primaryKey(),
	role: varchar("role").notNull(),
	email: varchar("email").notNull().unique(),
	createdAt: timestamp("createdAt").notNull().defaultNow(),
	updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const admin = pgTable("admin", {
	adminId: varchar("admin_id").primaryKey(),
	name: varchar("name").notNull(),
	email: varchar("email").notNull().unique(),
	passwordHash: varchar("password_hash").notNull(),
	createdAt: timestamp("createdAt").notNull().defaultNow(),
	updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const doctor = pgTable("doctor", {
	doctorId: varchar("doctor_id").primaryKey(),
	name: varchar("name").notNull(),
	email: varchar("email").notNull().unique(),
	passwordHash: varchar("password_hash").notNull(),
	specialization: varchar("specialization").notNull(),
	department: varchar("department").notNull(),
	createdAt: timestamp("createdAt").notNull().defaultNow(),
	updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const patient = pgTable("patient", {
	patientId: varchar("patient_id").primaryKey(),
	name: varchar("name").notNull(),
	email: varchar("email").notNull().unique(),
	passwordHash: varchar("password_hash").notNull(),
	phone: varchar("phone").notNull(),
	createdAt: timestamp("createdAt").notNull().defaultNow(),
	updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const appointments = pgTable("appointments", {
	appointmentId: varchar("appointment_id").primaryKey(),
	patientId: varchar("patient_id").notNull(),
	doctorId: varchar("doctor_id").notNull(),
	appointmentDate: timestamp("appointment_date").notNull(),
	status: varchar("status").notNull(),
	reasonForVisit: varchar("reason_for_visit").notNull(),
	createdAt: timestamp("createdAt").notNull().defaultNow(),
	updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const notes = pgTable("notes", {
	noteId: varchar("note_id").primaryKey(),
	appointmentId: varchar("appointment_id").notNull(),
	content: varchar("content").notNull(),
	createdAt: timestamp("createdAt").notNull().defaultNow(),
	updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const notifications = pgTable("notifications", {
	notificationId: varchar("notification_id").primaryKey(),
	userId: varchar("user_id").notNull(),
	type: varchar("type").notNull(),
	message: varchar("message").notNull(),
	isRead: boolean("is_read").notNull().default(false),
	createdAt: timestamp("createdAt").notNull().defaultNow(),
	updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});
