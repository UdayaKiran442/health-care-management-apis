import { CreateAdminInDBError } from "../exceptions/admin.exceptions";
import type { ICreateAdminSchema } from "../routes/v1/admin.route";
import { generateNanoId } from "../utils/nanoId.utils";
import db from "./db";
import { admin } from "./schema";

export async function createAdminInDB(payload: ICreateAdminSchema) {
	try {
		const insertPayload = {
			adminId: `admin_${generateNanoId()}`,
			name: payload.name,
			email: payload.email,
			passwordHash: payload.hashedPassword,
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		await db.insert(admin).values(insertPayload);
		return insertPayload;
	} catch (error) {
		throw new CreateAdminInDBError("Failed to create admin in DB", { cause: (error as Error).message });
	}
}
