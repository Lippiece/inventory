import type { ILesson } from "@/models/Lesson"
import Lesson from "./Lesson"

const LessonsList = (lessons: ILesson[]) => (
  <ul>
    {lessons.map((lesson, index) => (
      <li key={index}>
        <Lesson lesson={lesson} />
      </li>
    ))}
  </ul>
)

export default LessonsList
