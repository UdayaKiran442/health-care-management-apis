import { eq } from "drizzle-orm";
import { CreateAdminInDBError, GetAdminByEmailFromDBError } from "../exceptions/admin.exceptions";
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

export async function getAdminByEmailFromDB(email: string) {
	try {
		const adminData = await db.select().from(admin).where(eq(admin.email, email));
		return adminData[0];
	} catch (error) {
		throw new GetAdminByEmailFromDBError("Failed to get admin by email from DB", { cause: (error as Error).message });
	}
}
