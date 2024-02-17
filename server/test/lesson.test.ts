/* eslint-disable jest/require-hook */
import "../src/pre-start"

import assert from "node:assert"

import { beforeAll, describe, expect, it } from "bun:test"
import mongoose from "mongoose"
import request from "supertest"

import routes from "@/constants/routes.js"
import Lesson, { type ILesson } from "@/models/Lesson.js"
import app from "@/server.js"

const getNewLessonData = (number: number) => ({
  active     : true,
  date       : new Date(),
  description: `description ${number}`,
  price      : 100,
  title      : `title ${number}`,
})
const getNewLesson     = (number: number) => new Lesson(getNewLessonData(number))
const lessons          = [1, 2, 3].map(getNewLesson)

describe("lesson controllers", () => {
  beforeAll(async () => {
    await mongoose.connection.dropCollection("lessons")
    await Promise.all(lessons.map(async lesson => await lesson.save()))
  })

  describe("lessons", () => {
    it("should return all lessons", async () => {
      const response = await request(app).get(routes.lesson.lessons)
      const { body } = response

      assert.equal(
        body.length,
        lessons.length,
        `There should be ${lessons.length} lessons`,
      )
    })
  })

  describe("lesson", () => {
    it("lesson GET should return a lesson", async () => {
      const url           = `${routes.lesson.Base}/${lessons[0]!.id}`
      const response      = await request(app).get(url)
      const body: ILesson = response.body

      assert.equal(
        body._id,
        lessons[0]!.id,
        `Body (${body}) Lesson id should be 1`,
      )
    }, 1000)

    it("lesson POST should create a lesson, accepting new data", async () => {
      const url           = routes.lesson.add
      const newLessonData = getNewLessonData(4)
      const response      = await request(app).post(url).send(newLessonData)
      const { body }      = response
      const newLessons    = await Lesson.find({})

      expect(response.status).toBe(HttpStatusCodes.CREATED)
      expect(newLessons.length).toBe(lessons.length + 1)
      expect(body.url).toMatch(/\/lesson\/[\da-f]+/v)
    }, 1000)

    it("lesson DELETE should delete a lesson", async () => {
      const url                   = `${routes.lesson.Base}/${lessons[0]!.id}/delete`
      const response              = await request(app).delete(url)
      const newLessons: ILesson[] = response.body

      expect(response.status).toBe(HttpStatusCodes.OK)
      expect(newLessons.length).toBe(lessons.length - 1)
    }, 1000)

    it("lesson PUT should update a lesson", async () => {
      const fetchedLessons = await Lesson.find({})

      const url           = `${routes.lesson.Base}/${fetchedLessons[0]!.id}/update`
      const newLessonData = getNewLessonData(4)
      const response      = await request(app).put(url).send(newLessonData)
      const body: ILesson = response.body

      expect(body.name).toBe(newLessonData.name)
    }, 1000)

    it("lesson PUT should validate data", async () => {
      const fetchedLessons = await Lesson.find({})

      const url  = `${routes.lesson.Base}/${fetchedLessons[0]!.id}/update`
      const data = {
        ...getNewLessonData(4),
        description: "<script>alert(1)</script>",
        name       : "<script>alert(1)</script>",
      }

      let response = await request(app).put(url).send(data)

      const { body } = response

      expect(body.name).toBe("&lt;script&gt;alert(1)&lt;&#x2F;script&gt;")
      expect(body.description).toBe(
        "&lt;script&gt;alert(1)&lt;&#x2F;script&gt;",
      )

      data.status = "<script>alert(1)</script>"
      response    = await request(app).put(url).send(data)

      expect(response.status).toBe(HttpStatusCodes.BAD_REQUEST)
    })
  })
})
