import { Hono } from "hono";
import z from "zod";

import { assignDoctor, createAdmin } from "../../controller/admin.controller";
import { hashPassword } from "../../utils/hashPassword.utils";
import { CreateAdminError, CreateAdminInDBError } from "../../exceptions/admin.exceptions";
import { CreateUserInDBError } from "../../exceptions/user.exceptions";
import { authMiddleware } from "../../middleware/auth.middleware";
import { authorizeMiddleware } from "../../middleware/authorize.middleware";
import { addPatient } from "../../controller/patient.controller";
import { AddPatientError, AddPatientInDBError } from "../../exceptions/patient.exceptions";

const adminRoute = new Hono();

const CreateAdminSchema = z.object({
	name: z.string().describe("Name of the admin"),
	email: z.string().describe("Email of the admin"),
	password: z.string().describe("Password for the admin account"),
});

export type ICreateAdminSchema = z.infer<typeof CreateAdminSchema> & {
	hashedPassword: string;
};

adminRoute.post("/create", async (c) => {
	try {
		const validation = CreateAdminSchema.safeParse(await c.req.json());
		if (!validation.success) {
			throw validation.error;
		}

		const payload = {
			...validation.data,
			hashedPassword: await hashPassword(validation.data.password),
		};

		const newAdmin = await createAdmin(payload);
		return c.json({ success: true, newAdmin }, 201);
	} catch (error) {
		if (error instanceof z.ZodError) {
			const errMessage = JSON.parse(error.message);
			return c.json({ success: false, error: errMessage[0], message: errMessage[0].message }, 400);
		}

		if (error instanceof CreateAdminError || error instanceof CreateAdminInDBError || error instanceof CreateUserInDBError) {
			return c.json({ success: false, message: error.message, error: error.cause }, 500);
		}

		return c.json({ success: false, message: "Failed to create admin", error: (error as Error).message }, 500);
	}
});

const AssignDoctorSchema = z.object({
	name: z.string().describe("Name of the doctor"),
	email: z.string().describe("Email of the doctor"),
	password: z.string().describe("Password for the doctor account"),
	specialization: z.string().describe("Specialization of the doctor"),
	department: z.string().describe("Department of the doctor"),
});

export type IAssignDoctorSchema = z.infer<typeof AssignDoctorSchema> & {
	hashedPassword: string;
};

adminRoute.post("/assign-doctor", authMiddleware, authorizeMiddleware("admin"), async (c) => {
	try {
		const validation = AssignDoctorSchema.safeParse(await c.req.json());
		if (!validation.success) {
			throw validation.error;
		}

		const payload = {
			...validation.data,
			hashedPassword: await hashPassword(validation.data.password),
		};

		const newDoctor = await assignDoctor(payload);

		return c.json({ success: true, message: "Doctor assigned successfully", newDoctor }, 201);
	} catch (error) {
		return c.json({ success: false, message: "Failed to assign doctor", error: (error as Error).message }, 500);
	}
});

const AssignPatientSchema = z.object({
	name: z.string().describe("Name of the patient"),
	email: z.string().describe("Email of the patient"),
	password: z.string().describe("Password for the patient account"),
	phone: z.string().describe("Phone number of the patient"),
});

export type IAssignPatientSchema = z.infer<typeof AssignPatientSchema> & {
	hashedPassword: string;
};

adminRoute.post("/assign-patient", authMiddleware, authorizeMiddleware("admin"), async (c) => {
	try {
		const validation = AssignPatientSchema.safeParse(await c.req.json());
		if (!validation.success) {
			throw validation.error;
		}

		const payload = {
			...validation.data,
			hashedPassword: await hashPassword(validation.data.password),
		};

		const newPatient = await addPatient(payload);

		return c.json({ success: true, message: "Patient assigned successfully", newPatient }, 201);
	} catch (error) {
		if (error instanceof AddPatientInDBError || error instanceof AddPatientError) {
			return c.json({ success: false, message: error.message, error: error.cause }, 500);
		}
		return c.json({ success: false, message: "Failed to assign patient", error: (error as Error).message }, 500);
	}
});

export default adminRoute;
