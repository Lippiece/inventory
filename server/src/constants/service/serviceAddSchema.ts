import {
  coerce,
  minLength,
  number,
  object,
  string,
} from "valibot"

const serviceAddSchema = object({
  description: string(),
  duration   : coerce(number(), Number),
  name       : string([minLength(1)]),
  price      : coerce(number(), Number),
})

export default serviceAddSchema
