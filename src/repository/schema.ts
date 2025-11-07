import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

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
  dateOfBirth: timestamp("date_of_birth").notNull(),
  phone: varchar("phone").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});
