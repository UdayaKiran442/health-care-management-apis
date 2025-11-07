// function to create JWT token with 30 days expiration
import { sign } from "jsonwebtoken";

export function generateJwtToken(payload: { id: string, role: string }) {
	return sign(payload, process.env.JWT_SECRET || "secret", {
		expiresIn: "30d",
	});
}
