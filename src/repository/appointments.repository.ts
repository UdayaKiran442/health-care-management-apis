import { and, between, eq } from "drizzle-orm";

import { APPOINTMENT_STATUS } from "../constants/constants";
import { AddAppointmentToDBError, CheckInPatientInDBError, GetDoctorAppointmentsFromDBError } from "../exceptions/appointments.exceptions";
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

export async function checkInPatientInDB(appointmentId: string) {
	try {
		await db.update(appointments).set({ status: APPOINTMENT_STATUS.CHECKED_IN, updatedAt: new Date() }).where(eq(appointments.appointmentId, appointmentId));
	} catch (error) {
		throw new CheckInPatientInDBError("Failed to check in patient", { cause: (error as Error).message });
	}
}

export async function getDoctorAppointmentsFromDB(payload: { doctorId: string; startDate: Date; endDate: Date }) {
	try {
		return await db
			.select()
			.from(appointments)
			.where(and(eq(appointments.doctorId, payload.doctorId), between(appointments.appointmentDate, payload.startDate, payload.endDate)));
	} catch (error) {
		throw new GetDoctorAppointmentsFromDBError("Failed to get doctor's appointments from DB", { cause: (error as Error).message });
	}
}
