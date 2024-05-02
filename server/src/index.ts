import "./setup"

import { Hono } from "hono"
import { logger } from "hono/logger"
import { serveStatic } from "hono/bun"
// import { serveStatic } from "@hono/node-server/serve-static"

import errorHandler from "./functions/errorHandler"
import api from "./routes/api"

const app = new Hono()

// Middleware
app.use(logger())

// Routes
app.use("/*", serveStatic({ root: "dist/" }))

app.route("/api", api)

// Error
app.onError(errorHandler)

export type AppT = typeof app
export default app
