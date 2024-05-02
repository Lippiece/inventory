import "../src/setup"

import { beforeAll, describe, expect, it } from "bun:test"
import { testClient } from "hono/testing"
import mongoose from "mongoose"

import Lesson, { ILesson } from "@/models/Lesson"
import Service from "@/models/Service"
import { servicesRouter } from "@/routes/services"
import ServiceJSX from "@/views/service/Service"
import ServiceList from "@/views/service/ServiceList"

const createSerivceData = (number: number) => ({
  description: `description ${number}`,
  duration   : number,
  name       : `name ${number}`,
  price      : number,
})
const getNewService     = (number: number) => new Service(createSerivceData(number))
const services          = [1, 2, 3].map(getNewService)
const getNewLessonData  = (number: number): ILesson => ({
  active     : true,
  date       : new Date(),
  description: `description ${number}`,
  price      : number,
  service    : services[number - 1]._id,
  title      : `title ${number}`,
})
const getNewLesson      = (number: number) => new Lesson(getNewLessonData(number))
const lessons           = [1, 2, 3].map(getNewLesson)

describe("lesson controllers", () => {
  const client = testClient(servicesRouter)

  beforeAll(async () => {
    await mongoose.connection.dropCollection("lessons")
    await mongoose.connection.dropCollection("services")
    await Promise.all(lessons.map(async lesson => await lesson.save()))
    await Promise.all(services.map(async service => await service.save()))
  })

  it("should get all services", async () => {
    const response = await client.index.$get()
    const text     = await response.text()

    expect(response.status).toBe(200)
    expect(text).toBe(ServiceList({ services }).toString())
  }, 1000)

  it("should get one service", async () => {
    const response = await client[services[0]._id].$get()
    const text     = await response.text()

    expect(response.status).toBe(200)
    expect(text).toBe(ServiceJSX({ service: services[0] }).toString())
  }, 1000)

  it("should create a service, accepting new data", async () => {
    const newService = getNewService(4)
    const response   = await client[`${newService._id}/add`].$post({
      form: createSerivceData(4),
    })
    const text       = await response.text()

    expect(response.status).toBe(200)
    expect(text).toBe(ServiceJSX({ service: newService }).toString())
  }, 1000)

  it("should delete a service", async () => {
    const response = await client[`${services[0]._id}/delete`].$delete()
    const text     = await response.text()

    expect(response.status).toBe(200)
    expect(text).toBe("Service deleted")
  }, 1000)

  it("should update a service's fields", async () => {
    const form     = { description: "new description" }
    const response = await client[`${services[1]._id}/update`].$put({
      form,
    })
    const text     = await response.text()

    expect(response.status).toBe(200)
    expect(text).toBe(
      ServiceJSX({
        service: { ...services[1].toObject(), ...form },
      }).toString(),
    )
  }, 1000)

  it("should validate data", async () => {
    const form     = { price: "invalid" }
    const response = await client[`${services[1]._id}/update`].$put({
      form,
    })
    const text     = await response.text()

    expect(response.status).toBe(400)
    expect(text).toContain("Expected number")
  }, 1000)
})
