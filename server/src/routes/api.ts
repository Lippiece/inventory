import { Router } from "express"
import { OK } from "http-status"

import routes from "@/constants/routes.js"
import {
  lessonAdd,
  lessonDelete,
  lessonDeleteAll,
  lessonGet,
  lessonGetAll,
  lessonUpdate,
} from "@/controllers/lesson.js"

const router = Router()

// **** Routes **** //

// Root
router.get("/", (_req, res) => {
  res.redirect(routes.health)
})

router.get(routes.health, (_req, res) => {
  res.sendStatus(OK)
})

// Lessons
router.get(routes.lesson.Base, lessonGetAll)
router.get(routes.lesson.id, lessonGet)
router.post(routes.lesson.idAdd, lessonAdd)
router.put(routes.lesson.idUpdate, lessonUpdate)
router.delete(routes.lesson.idDelete, lessonDelete)
router.delete(routes.lesson.deleteAll, lessonDeleteAll)

export default router
