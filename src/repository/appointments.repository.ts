import { and, between, eq } from "drizzle-orm";

import { APPOINTMENT_STATUS } from "../constants/constants";
import {
	AddAppointmentToDBError,
	CheckInPatientInDBError,
	GetDoctorAppointmentDetailsFromDBError,
	GetDoctorAppointmentsFromDBError,
	GetPatientAppointmentsFromDBError,
} from "../exceptions/appointments.exceptions";
import type { IFixAppointmentSchema } from "../routes/v1/admin.route";
import { generateNanoId } from "../utils/nanoId.utils";
import db from "./db";
import { appointments, patient } from "./schema";
import type { IGetDoctorAppointmentSchema } from "../routes/v1/doctors.route";

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

export async function getDoctorAppointmentDetailsFromDB(payload: IGetDoctorAppointmentSchema) {
	try {
		const appointmentDetails = await db
			.select({
				appointmentId: appointments.appointmentId,
				doctorId: appointments.doctorId,
				patientId: appointments.patientId,
				appointmentDate: appointments.appointmentDate,
				reasonForVisit: appointments.reasonForVisit,
				patientName: patient.name,
				patientEmail: patient.email,
				patientPhone: patient.phone,
			})
			.from(appointments)
			.where(eq(appointments.appointmentId, payload.appointmentId))
			.innerJoin(patient, eq(appointments.patientId, patient.patientId));
		return appointmentDetails[0];
	} catch (error) {
		throw new GetDoctorAppointmentDetailsFromDBError("Failed to get latest appointment for doctor from DB", { cause: (error as Error).message });
	}
}

export async function getPatientAppointmentsFromDB(patientId: string) {
	try {
		return await db.select().from(appointments).where(eq(appointments.patientId, patientId));
	} catch (error) {
		throw new GetPatientAppointmentsFromDBError("Failed to get patient's appointments from DB", { cause: (error as Error).message });
	}
}
