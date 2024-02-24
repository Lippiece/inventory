import type { ILesson } from "@/models/Lesson"
import Service from "@/models/Service"

const Lesson = async ({ lesson }: { lesson: ILesson }) => {
  const service = await Service.findById(lesson.service)
  return (
    <article>
      <h2>
        {lesson.title}
        {": "}
        <span>
          {lesson.active ? "Скорее записывайтесь!" : "Пока недоступно"}
        </span>
      </h2>
      <h3>
        {lesson.date?.toLocaleString("ru-RU")}
        {": "}
      </h3>
      {lesson.service && (
        <h4>
          {service?.name}, длительность: {service?.duration} ч.
        </h4>
      )}
      <p>{lesson.description}</p>
      <p>Стоимость: {lesson.price} ₽</p>
    </article>
  )
}

export default Lesson
