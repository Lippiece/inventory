import "../src/setup"

import { beforeAll, describe, expect, it } from "bun:test"
import { testClient } from "hono/testing"
import mongoose from "mongoose"

import Lesson, { ILesson } from "@/models/Lesson"
import Service from "@/models/Service"
import { servicesRoutes } from "@/routes/services"
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
  const client = testClient(servicesRoutes)

  beforeAll(async () => {
    await mongoose.connection.dropCollection("lessons")
    await mongoose.connection.dropCollection("services")
    await Promise.all(lessons.map(async lesson => await lesson.save()))
    await Promise.all(services.map(async service => await service.save()))
  })

  describe("services", () => {
    it("should return all services", async () => {
      const response = await client.index.$get()
      const text     = await response.text()

      expect(response.status).toBe(200)

      expect(text).toBe(ServiceList({ services }).toString())
    }, 1000)
  })
})
