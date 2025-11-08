import type { Context, Next } from "hono";

export function authorizeMiddleware(role: string) {
	return async (c: Context, next: Next) => {
		const user = c.get("user");

		if (!user || user.role !== role) {
			return c.json({ error: "Forbidden: Access denied" }, 403);
		}

		await next();
	};
}
