import { Hono } from "hono"

const services = new Hono()
const servicesRoutes = services
  .get("/", async context => {
    // TODO: Get services
    const services = []
    return await context.text("Services")
  })
  .get("/:id", async context => {
    // TODO: Get service
    const id = context.req.param("id")
    return await context.text("Service")
  })
  .post("/:id/add", async context => {
    // TODO: Create service
    const id = context.req.param("id")
    return await context.text("Service created")
  })
  .put("/:id/update", async context => {
    // TODO: Update service
    const id = context.req.param("id")
    return await context.text("Service updated")
  })
  .delete("/:id/delete", async context => {
    // TODO: Delete service
    const id = context.req.param("id")
    return await context.text("Service deleted")
  })
