import { Hono } from "hono"

import lessons from "./lessons"

const api = new Hono()

// **** Routes **** //

// Root
api
  .get("/", context => context.redirect("/api/health"))
  .get("/health", context => context.text("Everything works!"))

// Lessons
api.route("/lessons", lessons)

export default api
