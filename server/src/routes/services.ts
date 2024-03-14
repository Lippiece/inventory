import { vValidator } from "@hono/valibot-validator"
import { Hono } from "hono"
import { isValidObjectId } from "mongoose"

import serviceAddSchema from "@/constants/service/serviceAddSchema"
import servicePutSchema from "@/constants/service/servicePutSchema"
import Service from "@/models/Service"
import ServiceJSX from "@/views/service/Service"
import ServiceList from "@/views/service/ServiceList"

const servicesRouter = new Hono()

export const servicesRoutes = servicesRouter
  .get("/", async context => {
    const services = await Service.find()

    return await context.html(ServiceList({ services }))
  })
  .get(
    "/:id",

    context => {
      const id = context.req.param("id")

      if (!isValidObjectId(id)) {
        return context.text("Invalid ID", 400)
      }
    },

    async context => {
      const id = context.req.param("id")
      const service = await Service.findById(id)

      if (!service) {
        return context.text("Service not found", 404)
      }

      return await context.html(ServiceJSX({ service }))
    },
  )
  .post(
    "/:id/add",
    vValidator("form", serviceAddSchema, (result, context) => {
      if (!result.success) {
        return context.json(result.issues, 400)
      }
    }),
    async context => {
      const service = new Service(context.req.valid("form"))

      await service.save()

      return await context.html(ServiceJSX({ service }))
    },
  )
  .put(
    "/:id/update",
    vValidator("form", servicePutSchema, (result, context) => {
      if (!result.success) {
        return context.json(result.issues, 400)
      }
    }),
    async context => {
      const id      = context.req.param("id")
      const service = await Service.findById(id)

      if (service) {
        await service.updateOne(context.req.valid("form"))

        const newService = await Service.findById(id)

        return await context.html(ServiceJSX({ service: newService }))
      }

      return context.text("Service not found", 404)
    },
  )
  .delete("/:id/delete", async context => {
    const id = context.req.param("id")

    await Service.findByIdAndDelete(id)

    return context.text("Service deleted")
  })

export default servicesRouter
