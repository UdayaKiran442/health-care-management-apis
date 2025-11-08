import { SendNotificationError } from "../exceptions/notifications.exceptions";
import { createNotificationInDB } from "../repository/notifications.repository";
import logger from "../services/logger.service";
import { WebSocketService } from "../services/websockets.service";

export async function sendNotification(payload: { userId: string; type: string; message: string }) {
	try {
		const ws = new WebSocketService();
		ws.sendMessage(payload.userId, payload.message);
		return await createNotificationInDB({ userId: payload.userId, type: payload.type, message: payload.message });
	} catch (error) {
		logger.error("Error sending notification: %o", error);
		throw new SendNotificationError("Failed to send notification", { cause: (error as Error).message });
	}
}
