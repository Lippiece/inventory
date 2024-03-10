import { Hono } from "hono"

import Service from "@/models/Service"
import ServiceList from "@/views/service/ServiceList"

const services = new Hono()

export const servicesRoutes = services
  .get("/", async context => {
    // TODO: Get services
    const services = await Service.find()

    return await context.html(ServiceList({ services }))
  })
  .get("/:id", async context => {
    // TODO: Get service
    const id = context.req.param("id")

    return context.text("Service")
  })
  .post("/:id/add", async context => {
    // TODO: Create service
    const id = context.req.param("id")

    return context.text("Service created")
  })
  .put("/:id/update", async context => {
    // TODO: Update service
    const id = context.req.param("id")

    return context.text("Service updated")
  })
  .delete("/:id/delete", async context => {
    // TODO: Delete service
    const id = context.req.param("id")

    return context.text("Service deleted")
  })

export default services
