import "./pre-start"

import logger from "jet-logger"
import { getPort, setBasePort } from "portfinder"

import EnvironmentVariables from "./constants/envVars.ts"
import app from "./server.ts"

// **** Run **** //

setBasePort(EnvironmentVariables.Port)
getPort(
  {
    port: EnvironmentVariables.Port,
  },
  (error, port) => {
    const SERVER_START_MSG = `Express server started on port: ${port}`

    if (error) {
      throw error
    }

    app.listen(port, () => {
      logger.info(SERVER_START_MSG)
    })
  },
)
