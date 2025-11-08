import { USER_ROLES } from "../constants/constants";
import { CheckInPatientError, CreateAdminError, CreateAdminInDBError, FixAppointmentError } from "../exceptions/admin.exceptions";
import { AddAppointmentToDBError, CheckInPatientInDBError } from "../exceptions/appointments.exceptions";
import { AddDoctorInDBError, AssignDoctorError, GetLatestAppointmentForDoctorFromDBError } from "../exceptions/doctor.exceptions";
import { CreateUserInDBError } from "../exceptions/user.exceptions";
import { createAdminInDB } from "../repository/admin.repository";
import { addAppointmentInDB, checkInPatientInDB } from "../repository/appointments.repository";
import { addDoctorInDB, getLatestAppointmentForDoctorFromDB } from "../repository/doctor.repository";
import { addUserInDB } from "../repository/user.repository";
import type { IAssignDoctorSchema, ICheckInPatientSchema, ICreateAdminSchema, IFixAppointmentSchema } from "../routes/v1/admin.route";

export async function createAdmin(payload: ICreateAdminSchema) {
	try {
		// insert into db
		return await Promise.all([createAdminInDB(payload), addUserInDB({ email: payload.email, role: USER_ROLES.ADMIN })]);
	} catch (error) {
		if (error instanceof CreateAdminInDBError || error instanceof CreateUserInDBError) {
			throw error;
		}
		throw new CreateAdminError("Failed to create admin", { cause: (error as Error).message });
	}
}

export async function assignDoctor(payload: IAssignDoctorSchema) {
	try {
		// insert into db
		return await Promise.all([addDoctorInDB(payload), addUserInDB({ email: payload.email, role: USER_ROLES.DOCTOR })]);
	} catch (error) {
		if (error instanceof AddDoctorInDBError || error instanceof CreateUserInDBError) {
			throw error;
		}
		throw new AssignDoctorError("Failed to assign doctor", { cause: (error as Error).message });
	}
}

export async function fixAppointment(payload: IFixAppointmentSchema) {
	try {
		// fetch doctor latest appointment for the day based on payload.doctorId and payload.appointmentDate
		const latestAppointment = await getLatestAppointmentForDoctorFromDB({ doctorId: payload.doctorId, appointmentDate: payload.appointmentDate });

		if (latestAppointment.length === 0) {
			// create new appointment at payload.appointmentDate time at 9:00 AM
			payload.appointmentDate.setHours(9);
			payload.appointmentDate.setMinutes(0);
			payload.appointmentDate.setSeconds(0);
			payload.appointmentDate.setMilliseconds(0);
			// insert into db and return appointment details
			return await addAppointmentInDB(payload);
		}

		// create new appointment +30 mins from latest appointment
		payload.appointmentDate.setHours(latestAppointment[0].appointmentDate.getHours());
		payload.appointmentDate.setMinutes(latestAppointment[0].appointmentDate.getMinutes() + 30);
		payload.appointmentDate.setSeconds(latestAppointment[0].appointmentDate.getSeconds());
		payload.appointmentDate.setMilliseconds(latestAppointment[0].appointmentDate.getMilliseconds());

		// insert into db and return appointment details
		return await addAppointmentInDB(payload);

		// insert into db and return appointment details
	} catch (error) {
		if (error instanceof GetLatestAppointmentForDoctorFromDBError || error instanceof AddAppointmentToDBError) {
			throw error;
		}
		throw new FixAppointmentError("Failed to fix appointment", { cause: (error as Error).message });
	}
}

export async function checkInPatient(payload: ICheckInPatientSchema) {
	try {
		await checkInPatientInDB(payload.appointmentId);
	} catch (error) {
		if (error instanceof CheckInPatientInDBError) {
			throw error;
		}
		throw new CheckInPatientError("Failed to check in patient", { cause: (error as Error).message });
	}
}
