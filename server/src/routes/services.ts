import { Hono } from "hono"

import Service from "@/models/Service"
import ServiceJSX from "@/views/service/Service"
import ServiceList from "@/views/service/ServiceList"
import { vValidator } from "@hono/valibot-validator"
import serviceAddSchema from "@/constants/service/serviceAddSchema"

const services = new Hono()

export const servicesRoutes = services
  .get("/", async context => {
    const services = await Service.find()

    return await context.html(ServiceList({ services }))
  })
  .get("/:id", async context => {
    const id      = context.req.param("id")
    const service = await Service.findById(id)

    return await context.html(ServiceJSX({ service }))
  })
  .post("/:id/add", 
  vValidator("form", serviceAddSchema, (result, context) => {
    if (!result.success) {
      return context.json(result.issues, 400)
    }
  }),
  async context => {
    const service = new Service(context.req.valid("form"))

    await service.save()

    return context.html(ServiceJSX({ service }))
  })
  .put("/:id/update", async context => {
    // TODO: Update service
    const id = context.req.param("id")

    return context.text("Service updated")
  })
  .delete("/:id/delete", async context => {
    const id = context.req.param("id")

    await Service.findByIdAndDelete(id)

    return context.text("Service deleted")
  })

export default services
