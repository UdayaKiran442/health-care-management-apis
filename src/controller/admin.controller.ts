import { USER_ROLES } from "../constants/constants";
import { CreateAdminError, CreateAdminInDBError } from "../exceptions/admin.exceptions";
import { CreateUserInDBError } from "../exceptions/user.exceptions";
import { createAdminInDB } from "../repository/admin.repository";
import { addUserInDB } from "../repository/user.repository";
import type { ICreateAdminSchema } from "../routes/v1/admin.route";

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
