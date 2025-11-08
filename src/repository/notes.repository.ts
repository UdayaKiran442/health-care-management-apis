import { AddNotesInDBError } from "../exceptions/notes.exceptions";
import type { IAddNoteSchema } from "../routes/v1/ notes.route";
import { generateNanoId } from "../utils/nanoId.utils";
import db from "./db";
import { notes } from "./schema";

export async function addNotesInDB(payload: IAddNoteSchema) {
	try {
		const insertPayload = {
			noteId: `note_${generateNanoId()}`,
			appointmentId: payload.appointmentId,
			content: payload.content,
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		await db.insert(notes).values(insertPayload);
		return insertPayload;
	} catch (error) {
		throw new AddNotesInDBError("Failed to add notes in DB", { cause: (error as Error).message });
	}
}
