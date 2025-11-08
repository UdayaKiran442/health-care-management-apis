import { desc, eq } from "drizzle-orm";
import { AddDoctorInDBError, GetLatestAppointmentForDoctorFromDBError } from "../exceptions/doctor.exceptions";
import type { IAssignDoctorSchema } from "../routes/v1/admin.route";
import { generateNanoId } from "../utils/nanoId.utils";
import db from "./db";
import { appointments, doctor } from "./schema";

export async function addDoctorInDB(payload: IAssignDoctorSchema) {
	try {
		const insertPayload = {
			doctorId: `doctor_${generateNanoId()}`,
			name: payload.name,
			email: payload.email,
			passwordHash: payload.hashedPassword,
			specialization: payload.specialization,
			department: payload.department,
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		await db.insert(doctor).values(insertPayload);
		return insertPayload;
	} catch (error) {
		throw new AddDoctorInDBError("Failed to add doctor in DB", { cause: (error as Error).message });
	}
}

// fetch doctor latest appointment for the day based on payload.doctorId and payload.appointmentDate
export async function getLatestAppointmentForDoctorFromDB(payload: { doctorId: string; appointmentDate: Date }) {
	try {
		return await db.select().from(appointments).where(eq(appointments.doctorId, payload.doctorId)).orderBy(desc(appointments.appointmentDate)).limit(1);
	} catch (error) {
        console.log("🚀 ~ getLatestAppointmentForDoctorFromDB ~ error:", error)
		throw new GetLatestAppointmentForDoctorFromDBError("Failed to get latest appointment for doctor from DB", { cause: (error as Error).message });
	}
}
