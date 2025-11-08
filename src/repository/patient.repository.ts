import { AddPatientInDBError } from "../exceptions/patient.exceptions";
import type { IAssignPatientSchema } from "../routes/v1/admin.route";
import { generateNanoId } from "../utils/nanoId.utils";
import db from "./db";
import { patient } from "./schema";

export async function addPatientInDB(payload: IAssignPatientSchema) {
	try {
		const insertPayload = {
			patientId: `patient_${generateNanoId()}`,
			name: payload.name,
			email: payload.email,
			passwordHash: payload.hashedPassword,
			phone: payload.phone,
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		await db.insert(patient).values(insertPayload);
		return insertPayload;
	} catch (error) {
		throw new AddPatientInDBError("Failed to add patient in DB", { cause: (error as Error).message });
	}
}
