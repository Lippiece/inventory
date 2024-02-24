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

const lessonPutSchema = object({
  active: optional(coerce(boolean(), (data: string) => data === "true")),

  date: optional(
    coerce(date([toMinValue(new Date())]), (data: string) => new Date(data)),
  ),

  description: optional(string()),
  price      : optional(coerce(number(), Number)),
  title      : optional(string()),
})

export default lessonPutSchema
