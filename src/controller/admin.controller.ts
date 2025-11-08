import { USER_ROLES } from "../constants/constants";
import { CreateAdminError, CreateAdminInDBError } from "../exceptions/admin.exceptions";
import { AddDoctorInDBError } from "../exceptions/doctor.exceptions";
import { CreateUserInDBError } from "../exceptions/user.exceptions";
import { createAdminInDB } from "../repository/admin.repository";
import { addDoctorInDB } from "../repository/doctor.repository";
import { addUserInDB } from "../repository/user.repository";
import type { IAssignDoctorSchema, ICreateAdminSchema } from "../routes/v1/admin.route";

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
		throw new CreateAdminError("Failed to assign doctor", { cause: (error as Error).message });
	}
}
