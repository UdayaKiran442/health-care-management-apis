import { Hono } from "hono";
import adminRoute from "./admin.route";

const v1Route = new Hono();

v1Route.route("/admin", adminRoute);

export default v1Route;
