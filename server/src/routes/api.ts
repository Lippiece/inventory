import { Hono } from "hono"

import lessons from "./lessons"
import services from "./services"
import telegramRouter from "./telegram"

const api = new Hono()

// **** Routes **** //

// Root
api
  .get("/", context => context.redirect("/api/health"))
  .get("/health", context => context.text("Everything works!"))

// Lessons
api
  .route("/lessons", lessons)
  .route("/services", services)
  .route("/telegram", telegramRouter)

export default api
