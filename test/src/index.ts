import { Hono } from "hono"
// import { serveStatic } from "hono/bun"
import { serveStatic } from "@hono/node-server/serve-static"

const app = new Hono()

app
  .use(serveStatic({ root: "../../client/dist/" }))
  .get("/", serveStatic({ path: "/index.html" }))
// .get("*", c => c.text("fallback"))

export type AppT = typeof app
export default app
