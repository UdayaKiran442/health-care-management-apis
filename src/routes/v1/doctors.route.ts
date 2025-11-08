import { Hono } from "hono";

import { authMiddleware } from "../../middleware/auth.middleware";
import { authorizeMiddleware } from "../../middleware/authorize.middleware";
import { USER_ROLES } from "../../constants/constants";
import z from "zod";
import { getDoctorAppointments } from "../../controller/doctors.controller";
import { GetDoctorAppointmentsFromDBError } from "../../exceptions/appointments.exceptions";
import { GetDoctorAppointmentsError } from "../../exceptions/doctor.exceptions";

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
			return c.json({ success: false, error: errMessage[0], message: errMessage[0].message }, 400);
		}
		if (error instanceof GetDoctorAppointmentsError || error instanceof GetDoctorAppointmentsFromDBError) {
			return c.json({ success: false, message: error.message, error: error.cause }, 500);
		}
		return c.json({ success: false, message: "Failed to fetch doctor's appointments", error: (error as Error).message }, 500);
	}
});

export default doctorsRoute;
