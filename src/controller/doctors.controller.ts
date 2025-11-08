import { GetDoctorAppointmentsFromDBError } from "../exceptions/appointments.exceptions";
import { GetDoctorAppointmentsError } from "../exceptions/doctor.exceptions";
import { getDoctorAppointmentsFromDB } from "../repository/appointments.repository";

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
