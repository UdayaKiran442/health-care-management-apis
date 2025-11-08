import { Hono } from "hono";
import z from "zod";
import { addNotes } from "../../controller/notes.controller";
import { AddNotesError, AddNotesInDBError } from "../../exceptions/notes.exceptions";

const notesRoute = new Hono();

const AddNoteSchema = z.object({
	appointmentId: z.string().describe("ID of the appointment"),
	content: z.string().describe("Content of the note"),
});

export type IAddNoteSchema = z.infer<typeof AddNoteSchema>;

notesRoute.post("/add", async (c) => {
	try {
		const validated = AddNoteSchema.safeParse(await c.req.json());
		if (!validated.success) {
			throw validated.error;
		}
		const newNote = await addNotes(validated.data);
		return c.json({ success: true, message: "Note added successfully", newNote }, 201);
	} catch (error) {
		if (error instanceof z.ZodError) {
			const errMessage = JSON.parse(error.message);
			return c.json({ success: false, error: errMessage[0], message: errMessage[0].message }, 400);
		}
		if (error instanceof AddNotesError || error instanceof AddNotesInDBError) {
			return c.json({ success: false, message: error.message, error: error.cause }, 500);
		}
		return c.json({ success: false, message: "Failed to add note", error: (error as Error).message }, 500);
	}
});

export default notesRoute;
