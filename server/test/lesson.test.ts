import "../src/setup"

import { beforeAll, describe, expect, it } from "bun:test"
import { testClient } from "hono/testing"
import mongoose from "mongoose"

import Lesson, { ILesson } from "@/models/Lesson"
import Service from "@/models/Service"
import { lessonsRoutes } from "@/routes/lessons"
import LessonJSX from "@/views/Lesson"

const service = new Service({
  description: "description",
  duration: 1,
  name: "name",
  price: 1,
})
const getNewLessonData = (number: number): ILesson => ({
  active: true,
  date: new Date(),
  description: `description ${number}`,
  price: number,
  service: service._id,
  title: `title ${number}`,
})
const getNewLesson = (number: number) => new Lesson(getNewLessonData(number))
const lessons = [1, 2, 3].map(getNewLesson)

describe("lesson controllers", () => {
  const client = testClient(lessonsRoutes)

  beforeAll(async () => {
    await mongoose.connection.dropCollection("lessons")
    await mongoose.connection.dropCollection("services")
    await service.save()
    await Promise.all(lessons.map(async lesson => await lesson.save()))
  })

  describe("lessons", () => {
    it("should return all lessons", async () => {
      const response = await client.index.$get()
      const text = await response.text()

      expect(response.status).toBe(200)

      lessons.map(lesson => {
        expect(text).toInclude(lesson.title)
      })
    }, 1000)
  })

  describe("lesson", () => {
    it("lesson GET should return a lesson", async () => {
      const response = await client[lessons[1].id].$get()
      const text = await response.text()

      expect(response.status).toBe(200)

      expect(text).toBe(LessonJSX({ lesson: lessons[1] }).toString())
    }, 1000)

    it("lesson POST should create a lesson, accepting new data", async () => {
      const newLesson = getNewLesson(4)
      const form = getNewLessonData(4)
      const response: Response = await client[`${newLesson.id}/add`].$post({
        form,
      })

      const text = await response.text()

      expect(response.status).toBe(200)
      expect(text).toBe(LessonJSX({ lesson: newLesson }).toString())
    }, 1000)

    it("lesson DELETE should delete a lesson", async () => {
      const response = await client[`${lessons[0].id}/delete`].$delete()
      const text = await response.text()

      expect(response.status).toBe(200)
      expect(text).toBe("Lesson deleted")
    }, 1000)

    it("lesson PUT should update a lesson", async () => {
      const form = { active: false }
      const response = await client[`${lessons[1].id}/update`].$put({
        form,
      })
      const text = await response.text()

      expect(response.status).toBe(200)
      expect(text).toBe(
        LessonJSX({
          lesson: { ...lessons[1]?.toObject(), ...form },
        }).toString(),
      )
    }, 1000)

    it("lesson PUT should validate data", async () => {
      const form = { date: "invalid" }
      const response = await client[`${lessons[1].id}/update`].$put({
        form,
      })
      const text = await response.text()

      expect(response.status).toBe(400)
      expect(text).toContain("Invalid type")
    })
  })
})
