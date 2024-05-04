import "dotenv/config"

import { Hono } from "hono"

import Failure from "@/views/telegram/Failure"
import Success from "@/views/telegram/Success"
import messageSchema from "@/constants/telegram/messageSchema.js"
import { vValidator } from "@hono/valibot-validator"

const telegramRouter   = new Hono()
const { TELEGRAM_BOT } = process.env

export const telegramRoutes = telegramRouter
  .get("/getMe", async context => {
    const bot = await fetch(`https://api.telegram.org/${TELEGRAM_BOT}/getMe`)

    return context.json(await bot.json())
  })
  .post("/sendMessage",
  vValidator("form", messageSchema, (result, context) => {
    if (!result.success) return context.json(result.issues, 400)
  }),
  async context => {
    const { CHAT_ID } = process.env
    const formData = context.req.valid("form")
    const name        = formData.name
    const phone       = formData.phone
    const text        = `Имя: ${name}%0AНомер: ${phone}`
    const response    = await fetch(
      `https://api.telegram.org/${TELEGRAM_BOT}/sendMessage?chat_id=${CHAT_ID}&text=${text}`,
    )
    const json        = await response.json()

    const success = json?.ok

    return success
      ? await context.html(Success())
      : // : context.html(Failure({json.description}), json.code)
        await context.html(Failure({ json }), json.code)
  })

export default telegramRouter
