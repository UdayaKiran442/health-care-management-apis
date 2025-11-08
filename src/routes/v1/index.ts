import { Hono } from "hono";

import adminRoute from "./admin.route";
import loginRoute from "./login.route";
import doctorsRoute from "./doctors.route";
import notesRoute from "./ notes.route";

const v1Route = new Hono();

v1Route.route("/admin", adminRoute);
v1Route.route("/login", loginRoute);
v1Route.route("/doctor", doctorsRoute);
v1Route.route("/notes", notesRoute);

export default v1Route;
