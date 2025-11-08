import { USER_ROLES } from "../constants/constants";
import { AddPatientError, AddPatientInDBError } from "../exceptions/patient.exceptions";
import { addPatientInDB } from "../repository/patient.repository";
import { addUserInDB } from "../repository/user.repository";
import type { IAssignPatientSchema } from "../routes/v1/admin.route";

export async function addPatient(payload: IAssignPatientSchema) {
	try {
		return await Promise.all([addPatientInDB(payload), addUserInDB({ email: payload.email, role: USER_ROLES.PATIENT })]);
	} catch (error) {
		if (error instanceof AddPatientInDBError) {
			throw error;
		}
		throw new AddPatientError("Failed to add patient", { cause: (error as Error).message });
	}
}
