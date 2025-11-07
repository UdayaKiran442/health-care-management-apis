import { Hono } from "hono";

const app = new Hono();

app.get("/", async (c) => {
  return c.text("Health Care Management API is running!");
});

export default app;
