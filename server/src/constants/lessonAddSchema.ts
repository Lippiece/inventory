import {
  boolean,
  coerce,
  date,
  minLength,
  number,
  object,
  parse,
  string,
  toMinValue,
} from "valibot"

const lessonAddSchema = object({
  active: coerce(boolean(), Boolean),

  date: coerce(
    date([toMinValue(new Date())]),
    (data: string) => new Date(data),
  ),

  description: string(),
  price      : coerce(number(), Number),
  title      : string([minLength(1)]),
})

console.debug(
  parse(lessonAddSchema, {
    active     : "true",
    date       : "2022-10-10",
    description: "test",
    price      : "10",
    title      : "test",
  }),
)

export default lessonAddSchema
