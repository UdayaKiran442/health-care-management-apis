import { AddNotesError, AddNotesInDBError } from "../exceptions/notes.exceptions";
import { addNotesInDB } from "../repository/notes.repository";
import type { IAddNoteSchema } from "../routes/v1/ notes.route";

export async function addNotes(payload: IAddNoteSchema) {
	try {
		return await addNotesInDB(payload);
	} catch (error) {
		if (error instanceof AddNotesInDBError) {
			throw error;
		}
		throw new AddNotesError("Failed to add notes", { cause: (error as Error).message });
	}
}
