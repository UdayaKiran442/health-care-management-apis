import { AddDoctorInDBError } from "../exceptions/doctor.exceptions";
import type { IAssignDoctorSchema } from "../routes/v1/admin.route";
import { generateNanoId } from "../utils/nanoId.utils";
import db from "./db";
import { doctor } from "./schema";

export async function addDoctorInDB(payload: IAssignDoctorSchema) {
    try {
        const insertPayload = {
            doctorId: `doctor_${generateNanoId()}`,
            name: payload.name,
            email: payload.email,
            passwordHash: payload.hashedPassword,
            specialization: payload.specialization,
            department: payload.department,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
        await db.insert(doctor).values(insertPayload);
        return insertPayload;
    } catch (error) {
        throw new AddDoctorInDBError("Failed to add doctor in DB", { cause: (error as Error).message });
    }
}