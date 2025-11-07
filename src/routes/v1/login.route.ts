import { Hono } from "hono";
import z from "zod";

const loginRoute = new Hono();

const LoginSchema = z.object({
  email: z.string().email().describe("Email of the user"),
  password: z.string().describe("Password of the user"),
});

export type ILoginSchema = z.infer<typeof LoginSchema>;

loginRoute.post("/", async (c) => {
  return c.json({ message: "Login successful" }, 200);
});

export default loginRoute;
