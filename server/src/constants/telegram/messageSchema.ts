import {
  minLength,
  object,
  string,
} from "valibot"

const messageSchema = object({
  name : string([minLength(2)]),
  phone: string([minLength(10)]),
})

export default messageSchema
