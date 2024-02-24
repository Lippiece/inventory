import { vValidator } from "@hono/valibot-validator"
import { Hono } from "hono"
import { HTTPException } from "hono/http-exception"

import lessonAddSchema from "@/constants/lessonAddSchema"
import LessonJSX from "@/views/Lesson"
import LessonsList from "@/views/LessonsList"

import Lesson from "../models/Lesson"

const lessons = new Hono()

export const lessonsRoutes = lessons
  .get("/", async context => {
    const lessons = await Lesson.find().exec()

    return await context.html(LessonsList(lessons))
  })

  .get("/:id", async context => {
    const id     = context.req.param("id")
    const lesson = await Lesson.findById(id).exec()

    if (lesson) {
      return await context.html(LessonJSX({ lesson }))
    }

    throw new HTTPException(404, { message: "Lesson not found" })
  })
  .post(
    "/:id/add",
    vValidator("form", lessonAddSchema, (result, context) => {
      if (!result.success) {
        return context.json(result.issues, 400)
      }
    }),
    async context => {
      const lesson = new Lesson(context.req.valid("form"))

      await lesson.save()

      return await context.html(LessonJSX({ lesson }))
    },
  )
  .delete("/:id/delete", async context => {
    const id = context.req.param("id")

    await Lesson.findByIdAndDelete(id).exec()

    return context.text("Lesson deleted")
  }) // TODO: Delete one lesson
  .put("/:id/update", context => context.text("Hello World!")) // TODO: Update one lesson

export default lessons
