import { Hono } from "hono";

import v1Route from "./routes/v1";

const app = new Hono();

app.route("/v1", v1Route);

app.get("/", async (c) => {
	return c.text("Health Care Management API is running!");
});

export default app;
