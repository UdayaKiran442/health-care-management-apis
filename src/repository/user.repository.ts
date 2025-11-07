import { eq } from "drizzle-orm";
import { CreateUserInDBError, GetUserByEmailFromDBError } from "../exceptions/user.exceptions";
import { generateNanoId } from "../utils/nanoId.utils";
import db from "./db";
import { user } from "./schema";

export async function addUserInDB(payload: { email: string; role: string }) {
	try {
		const insertPayload = {
			userId: `user_${generateNanoId()}`,
			email: payload.email,
			role: payload.role,
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		await db.insert(user).values(insertPayload);
		return insertPayload;
	} catch (error) {
		throw new CreateUserInDBError("Failed to create user in DB", { cause: (error as Error).message });
	}
}

export async function getUserByEmailFromDB(email: string) {
	try {
		const userData = await db.select().from(user).where(eq(user.email, email));
		return userData[0];
	} catch (error) {
		throw new GetUserByEmailFromDBError("Failed to get user by email from DB", { cause: (error as Error).message });
	}
}
