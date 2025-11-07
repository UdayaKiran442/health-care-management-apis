import { USER_ROLES } from "../constants/constants";
import { GetAdminByEmailFromDBError } from "../exceptions/admin.exceptions";
import { LoginError } from "../exceptions/login.exceptions";
import { GetUserByEmailFromDBError } from "../exceptions/user.exceptions";
import { getAdminByEmailFromDB } from "../repository/admin.repository";
import { getUserByEmailFromDB } from "../repository/user.repository";
import type { ILoginSchema } from "../routes/v1/login.route";

import { comparePassword } from "../utils/hashPassword.utils";
import { generateJwtToken } from "../utils/jwt.utils";

export async function loginController(payload: ILoginSchema) {
	try {
		let hashedPassword: string = "";
		const user = await getUserByEmailFromDB(payload.email);
		if (!user) {
			// handle not found error
		}
		if (user.role === USER_ROLES.ADMIN) {
			// handle admin login
			const admin = await getAdminByEmailFromDB(payload.email);
			hashedPassword = admin.passwordHash;
		} else if (user.role === USER_ROLES.DOCTOR) {
			// handle doctor login
		} else {
			// handle patient login
		}
		// verify password using bcrypt-ts
		const isValidPassword = await comparePassword({
			password: payload.password,
			hashedPassword: hashedPassword,
		});

		if (!isValidPassword) {
			throw new Error("Invalid email or password");
		}

		// generate jwt token
		return generateJwtToken({ id: user.userId, role: user.role });
	} catch (error) {
		if (error instanceof GetUserByEmailFromDBError || error instanceof GetAdminByEmailFromDBError) {
			throw error;
		}
		throw new LoginError("Failed to login", { cause: (error as Error).message });
	}
}
