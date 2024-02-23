import { HTTPException } from "hono/http-exception"

import Error from "../views/Error"

const errorHandler = (error, c) => {
  const status =
    error instanceof HTTPException ? error.getResponse().status : 500

  return c.html(Error({ error, status }), status)
}

export default errorHandler
