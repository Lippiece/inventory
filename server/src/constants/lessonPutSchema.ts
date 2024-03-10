import {
  boolean,
  coerce,
  date,
  number,
  object,
  optional,
  string,
  toMinValue,
} from "valibot"

const coerceDate   = (data: string) =>
  new Date(data).getDay() ? new Date(data) : data
const coerceNumber = (data: string) => (Number(data) ? Number(data) : data)

const lessonPutSchema = object({
  active: optional(coerce(boolean(), (data: string) => data === "true")),

  date: optional(coerce(date([toMinValue(new Date())]), coerceDate)),

  description: optional(string()),
  price      : optional(coerce(number(), coerceNumber)),
  service    : optional(string()),
  title      : optional(string()),
})

export default lessonPutSchema
