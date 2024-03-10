import "./setup"

import { Hono } from "hono"
import { basicAuth } from "hono/basic-auth"
import { logger } from "hono/logger"

import errorHandler from "./functions/errorHandler"
import api from "./routes/api"

const app = new Hono()

// Middleware
app.use(logger())
app.use(
  "/auth/*",
  basicAuth({
    password: "acoolproject",
    username: "hono",
  }),
)

// Routes
app
  .get("/", context => context.redirect("/api"))
  .get("/error", context => context.text(new Error("An error")))

app.route("/api", api)

// Error
app.onError(errorHandler)

export type AppT = typeof app
export default app
