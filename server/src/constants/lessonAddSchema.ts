import {
  boolean,
  coerce,
  date,
  minLength,
  number,
  object,
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
  service    : string(),
  title      : string([minLength(1)]),
})

export default lessonAddSchema
