import { Hono } from "hono"
import { HTTPException } from "hono/http-exception"

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
  .post("/:id/add", context => context.text("Hello World!")) // TODO: Add one lesson
  .put("/:id/update", context => context.text("Hello World!")) // TODO: Update one lesson
  .delete("/:id/delete", context => context.text("Hello World!")) // TODO: Delete one lesson

export default lessons
