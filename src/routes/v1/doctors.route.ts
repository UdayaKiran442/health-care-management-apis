import { Hono } from "hono";

import { authMiddleware } from "../../middleware/auth.middleware";
import { authorizeMiddleware } from "../../middleware/authorize.middleware";
import { USER_ROLES } from "../../constants/constants";
import z from "zod";
import { getDoctorAppointmentDetails, getDoctorAppointments } from "../../controller/doctors.controller";
import { GetDoctorAppointmentsFromDBError } from "../../exceptions/appointments.exceptions";
import { GetDoctorAppointmentDetailsError, GetDoctorAppointmentDetailsFromDBError, GetDoctorAppointmentsError } from "../../exceptions/doctor.exceptions";
import logger from "../../services/logger.service";

const doctorsRoute = new Hono();

const FetchDoctorsAppointmentsSchema = z.object({
	doctorId: z.string().describe("ID of the doctor"),
});

export type IFetchDoctorsAppointmentsSchema = z.infer<typeof FetchDoctorsAppointmentsSchema>;

doctorsRoute.post("/appointments", authMiddleware, authorizeMiddleware(USER_ROLES.DOCTOR), async (c) => {
	try {
		const validated = FetchDoctorsAppointmentsSchema.safeParse(await c.req.json());
		if (!validated.success) {
			throw validated.error;
		}
		const { doctorId } = validated.data;
		const appointments = await getDoctorAppointments(doctorId);
		return c.json({ success: true, appointments }, 201);
	} catch (error) {
		if (error instanceof z.ZodError) {
			const errMessage = JSON.parse(error.message);
			logger.error("Validation Error: %o", errMessage);
			return c.json({ success: false, error: errMessage[0], message: errMessage[0].message }, 400);
		}
		if (error instanceof GetDoctorAppointmentsError || error instanceof GetDoctorAppointmentsFromDBError) {
			logger.error("Application Error: %o", error);
			return c.json({ success: false, message: error.message, error: error.cause }, 500);
		}
		logger.error("Unknown Error: %o", error);
		return c.json({ success: false, message: "Failed to fetch doctor's appointments", error: (error as Error).message }, 500);
	}
});

const GetDoctorAppointmentSchema = z.object({
	patientId: z.string().describe("ID of the patient"),
	appointmentId: z.string().describe("ID of the appointment"),
});

export type IGetDoctorAppointmentSchema = z.infer<typeof GetDoctorAppointmentSchema>;

doctorsRoute.post("/appointment", async (c) => {
	try {
		const validation = GetDoctorAppointmentSchema.safeParse(await c.req.json());
		if (!validation.success) {
			throw validation.error;
		}
		const payload = validation.data;
		const appointmentDetails = await getDoctorAppointmentDetails(payload);
		return c.json({ success: true, appointmentDetails }, 200);
	} catch (error) {
		if (error instanceof z.ZodError) {
			const errMessage = JSON.parse(error.message);
			logger.error("Validation Error: %o", errMessage);
			return c.json({ success: false, error: errMessage[0], message: errMessage[0].message }, 400);
		}
		if (error instanceof GetDoctorAppointmentDetailsError || error instanceof GetDoctorAppointmentDetailsFromDBError) {
			logger.error("Application Error: %o", error);
			return c.json({ success: false, message: error.message, error: error.cause }, 500);
		}
		logger.error("Unknown Error: %o", error);
		return c.json({ success: false, message: "Failed to fetch doctor's appointment details", error: (error as Error).message }, 500);
	}
});

export default doctorsRoute;
