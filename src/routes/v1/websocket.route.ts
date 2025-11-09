import { Hono } from "hono";
import { upgradeWebSocket } from "hono/bun";
import { authMiddleware } from "../../middleware/auth.middleware";
import { WebSocketService } from "../../services/websockets.service";

const webSocketsRoute = new Hono();

const webSocketService = new WebSocketService();

webSocketsRoute.get(
	"/ws",
	authMiddleware,
	upgradeWebSocket((c) => {
		return {
			onOpen(_event, ws) {
				const { userId, role } = c.get("user");
				webSocketService.addClient(ws as never, userId, role);
			},
		};
	}),
);

export default webSocketsRoute;
