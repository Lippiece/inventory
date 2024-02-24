import "../src/setup"

import { beforeAll, describe, expect, it } from "bun:test"
import { testClient } from "hono/testing"
import mongoose from "mongoose"

import Lesson, { ILesson } from "@/models/Lesson"
import { lessonsRoutes } from "@/routes/lessons"
import LessonJSX from "@/views/Lesson"

const getNewLessonData = (number: number): ILesson => ({
  active: true,
  date: new Date(),
  description: `description ${number}`,
  price: number,
  title: `title ${number}`,
})
const getNewLesson = (number: number) => new Lesson(getNewLessonData(number))
const lessons = [1, 2, 3].map(getNewLesson)

describe("lesson controllers", () => {
  const client = testClient(lessonsRoutes)

  beforeAll(async () => {
    await mongoose.connection.dropCollection("lessons")
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
      const response = await client[lessons[0].id].$get()
      const text = await response.text()

      expect(response.status).toBe(200)

      expect(text).toBe(LessonJSX({ lesson: lessons[0] }).toString())
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

    it.skip("lesson DELETE should delete a lesson", async () => {}, 1000)

    it.skip("lesson PUT should update a lesson", async () => {}, 1000)

    it.skip("lesson PUT should validate data", async () => {})
  })
})
