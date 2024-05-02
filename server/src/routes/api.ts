import { Hono } from "hono"

import lessons from "./lessons"
import servicesRouter from "./services"

const api = new Hono()

// **** Routes **** //

// Root
api
  .get("/", context => context.redirect("/api/health"))
  .get("/health", context => context.text("Everything works!"))

// Lessons
api.route("/lessons", lessons)
api.route("/services", servicesRouter)

export default api
