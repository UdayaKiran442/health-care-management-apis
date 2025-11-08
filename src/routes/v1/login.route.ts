import { Hono } from "hono";
import z from "zod";
import { loginController } from "../../controller/login.controller";
import { LoginError } from "../../exceptions/login.exceptions";
import { GetAdminByEmailFromDBError } from "../../exceptions/admin.exceptions";
import { GetUserByEmailFromDBError } from "../../exceptions/user.exceptions";
import logger from "../../services/logger.service";

const loginRoute = new Hono();

const LoginSchema = z.object({
	email: z.string().email().describe("Email of the user"),
	password: z.string().describe("Password of the user"),
});

export type ILoginSchema = z.infer<typeof LoginSchema>;

loginRoute.post("/", async (c) => {
	try {
		const validation = LoginSchema.safeParse(await c.req.json());
		if (!validation.success) {
			throw validation.error;
		}

		// call login controller
		const token = await loginController(validation.data);
		return c.json({ success: true, token }, 200);
	} catch (error) {
		if (error instanceof z.ZodError) {
			const errMessage = JSON.parse(error.message);
			logger.error("Validation Error: %o", errMessage);
			return c.json({ success: false, error: errMessage[0], message: errMessage[0].message }, 401);
		}

		if (error instanceof LoginError || error instanceof GetUserByEmailFromDBError || error instanceof GetAdminByEmailFromDBError) {
			logger.error("Application Error: %o", error);
			return c.json({ success: false, message: error.message, error: error.cause }, 500);
		}

		logger.error("Unknown Error: %o", error);
		return c.json({ success: false, error: (error as Error).message }, 500);
	}
});

export default loginRoute;
