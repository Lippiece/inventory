import { Handler } from "express"
import { pipe } from "fp-ts/function"
import { match, tryCatchK } from "fp-ts/lib/TaskEither.js"
import { INTERNAL_SERVER_ERROR } from "http-status"
import Lesson from "src/models/Lesson.js"

export const lessonGetAll: Handler = async (_req, res) => {
  await pipe(
    tryCatchK(
      async () => await Lesson.find().exec(),
      error => new Error(error.message),
    ),

    match(
      error => {
        res.status(INTERNAL_SERVER_ERROR).json(error)
      },
      response => {
        res.json(response)
      },
    ),
  )()
}

export const lessonGet: Handler = async (req, res) => {
  const id   = req.url.split("/").at(-1)
  const task = await Lesson.findById(id).exec()
}

export const lessonAdd = []

export const lessonUpdate = []

export const lessonDelete: Handler = async (req, res) => {}

export const lessonDeleteAll: Handler = async (_req, res) => {}
