import { vValidator } from "@hono/valibot-validator"
import { Hono } from "hono"

import lessonAddSchema from "@/constants/lessonAddSchema"
import lessonPutSchema from "@/constants/lessonPutSchema"
import LessonJSX from "@/views/lesson/Lesson"
import LessonsList from "@/views/lesson/LessonsList"

import Lesson from "../models/Lesson"

const lessons = new Hono()

export const lessonsRoutes = lessons
  .get("/", async context => {
    const lessons = await Lesson.find()

    return await context.html(LessonsList(lessons))
  })

  .get("/:id", async context => {
    const id     = context.req.param("id")
    const lesson = await Lesson.findById(id)

    if (lesson) {
      return await context.html(await LessonJSX({ lesson }))
    }

    return context.text("Lesson not found", 404)
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

      return await context.html(await LessonJSX({ lesson }))
    },
  )
  .delete("/:id/delete", async context => {
    const id = context.req.param("id")

    await Lesson.findByIdAndDelete(id)

    return context.text("Lesson deleted")
  })
  .put(
    "/:id/update",
    vValidator("form", lessonPutSchema, (result, context) => {
      if (!result.success) {
        return context.json(result.issues, 400)
      }
    }),
    async context => {
      const id     = context.req.param("id")
      const form   = context.req.valid("form")
      const lesson = await Lesson.findById(id)

      if (lesson) {
        await lesson.updateOne(form)

        const newLesson = await Lesson.findById(id)

        return await context.html(await LessonJSX({ lesson: newLesson }))
      }

      return context.text(`Lesson ${id} not found`, 404)
    },
  )

export default lessons
