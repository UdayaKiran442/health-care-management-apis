import { AddAppointmentToDBError } from "../exceptions/appointments.exceptions";
import type { IFixAppointmentSchema } from "../routes/v1/admin.route";
import { generateNanoId } from "../utils/nanoId.utils";
import db from "./db";
import { appointments } from "./schema";

export async function addAppointmentInDB(payload: IFixAppointmentSchema) {
	try {
		const insertPayload = {
			appointmentId: `appointment_${generateNanoId()}`,
			patientId: payload.patientId,
			doctorId: payload.doctorId,
			appointmentDate: payload.appointmentDate,
			reasonForVisit: payload.reasonForVisit,
			status: "scheduled",
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		await db.insert(appointments).values(insertPayload);
        return insertPayload;
	} catch (error) {
		throw new AddAppointmentToDBError("Failed to add appointment in DB", { cause: (error as Error).message });
	}
}
