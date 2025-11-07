import { CreateAdminError, CreateAdminInDBError } from "../exceptions/admin.exceptions";
import { createAdminInDB } from "../repository/admin.repository";
import type { ICreateAdminSchema } from "../routes/v1/admin.route";

export async function createAdmin(payload: ICreateAdminSchema) {
	try {
		// insert into db
		return await createAdminInDB(payload);
	} catch (error) {
		if (error instanceof CreateAdminInDBError) {
			throw error;
		}
		throw new CreateAdminError("Failed to create admin", { cause: (error as Error).message });
	}
}
