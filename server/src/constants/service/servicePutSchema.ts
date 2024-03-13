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

const coerceNumber = (data: string) => (Number(data) ? Number(data) : data)

const servicePutSchema = object({
  description: optional(string()),
  duration   : optional(coerce(number(), coerceNumber)),
  name       : optional(string()),
  price      : optional(coerce(number(), coerceNumber)),
})

export default servicePutSchema

