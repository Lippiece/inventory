import type { ILesson } from "@/models/Lesson"

const Lesson = ({ lesson }: { lesson: ILesson }) => (
  <article>
    <h2>
      {lesson.title}:{" "}
      <span>
        {lesson.active ? "Скорее записывайтесь!" : "Пока не доступно"}
      </span>
    </h2>
    <h3>{lesson.date}</h3>
    <p>{lesson.description}</p>
    <p>Стоимость: {lesson.price} рублей</p>
  </article>
)

export default Lesson
