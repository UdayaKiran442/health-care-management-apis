import { GetDoctorAppointmentsFromDBError } from "../exceptions/appointments.exceptions";
import { GetDoctorAppointmentDetailsError, GetDoctorAppointmentDetailsFromDBError, GetDoctorAppointmentsError } from "../exceptions/doctor.exceptions";
import { getDoctorAppointmentsFromDB } from "../repository/appointments.repository";
import { getDoctorAppointmentDetailsFromDB } from "../repository/doctor.repository";
import type { IGetDoctorAppointmentSchema } from "../routes/v1/doctors.route";

export async function getDoctorAppointments(doctorId: string) {
	try {
		const startDate = new Date();
		startDate.setHours(0, 0, 0, 0);
		const endDate = new Date();
		endDate.setHours(23, 59, 59, 999);
		return await getDoctorAppointmentsFromDB({ doctorId, startDate, endDate });
	} catch (error) {
		if (error instanceof GetDoctorAppointmentsFromDBError) {
			throw error;
		}
		throw new GetDoctorAppointmentsError("Failed to get doctor's appointments", { cause: (error as Error).message });
	}
}

export async function getDoctorAppointmentDetails(payload: IGetDoctorAppointmentSchema) {
	try {
		return await getDoctorAppointmentDetailsFromDB(payload);
	} catch (error) {
		if (error instanceof GetDoctorAppointmentDetailsFromDBError) {
			throw error;
		}
		throw new GetDoctorAppointmentDetailsError("Failed to get doctor's appointment details", { cause: (error as Error).message });
	}
}
