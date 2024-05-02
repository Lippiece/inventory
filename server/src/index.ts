import "./setup"

import { Hono } from "hono"
// import { serveStatic } from "hono/bun"
import { serveStatic } from "@hono/node-server/serve-static"

import errorHandler from "./functions/errorHandler"
import api from "./routes/api"

const app = new Hono()

app
  .use(serveStatic({ root: "../../client/dist/" }))
  .get("/", serveStatic({ path: "/index.html" }))
  .get("*", c => c.text("fallback"))
// .get("/", serveStatic({ path: "/index.html" }))

app.route("/api", api)

// Error
app.onError(errorHandler)

export type AppT = typeof app
export default app
