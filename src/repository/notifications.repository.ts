import { CreateNotificationInDBError } from "../exceptions/notifications.exceptions";
import { generateNanoId } from "../utils/nanoId.utils";
import db from "./db";
import { notifications } from "./schema";

export async function createNotificationInDB(payload: { userId: string; type: string; message: string }) {
	try {
		const insertPayload = {
			notificationId: `notification_${generateNanoId()}`,
			userId: payload.userId,
			type: payload.type,
			message: payload.message,
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		await db.insert(notifications).values(insertPayload);
		return insertPayload;
	} catch (error) {
		throw new CreateNotificationInDBError("Failed to create notification in DB", { cause: (error as Error).message });
	}
}
