/**
 * Setup express server.
 */

import "express-async-errors"

import compression from "compression"
import cors from "cors"
import express, { type ErrorRequestHandler, json, urlencoded } from "express"
import helmet from "helmet"
import logger from "jet-logger"
import mongoose from "mongoose"
import morgan from "morgan"

import EnvironmentVariables from "./constants/envVars"
import HttpStatusCodes from "./constants/HttpStatusCodes"
import { NodeEnvs as NodeEnvironments } from "./constants/misc"
import router from "./routes/api"

// **** Variables **** //

const app = express()

// **** Setup **** //

// Mongoose
const connectToMongo = async () => {
  try {
    logger.info(`Connecting to ${EnvironmentVariables.MONGO}`)
    await mongoose.connect(EnvironmentVariables.MONGO)
    logger.info("MongoDB connected")
  } catch (error) {
    logger.err(error)
  }
}

connectToMongo()

// Basic middleware
app.use(compression())
app.use(json())
app.use(urlencoded({ extended: true }))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://lippiece.github.io/"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Show routes called in console during development
if (EnvironmentVariables.NodeEnv === NodeEnvironments.Dev.valueOf()) {
  app.use(
    morgan("dev"),
  )
}

app.use(cors())  

// app.use(cors({
  //  origin: ["https://lippiece.github.io/todo/", "https://lippiece.github.io/"]
// }))

// Security
if (EnvironmentVariables.NodeEnv === NodeEnvironments.Production.valueOf()) {
  app.use(helmet())
}

// Add APIs, must be after middleware
app.use("/", router)

const errorHandler: ErrorRequestHandler = (error, _, res, _next) => {
  logger.err(error, true)

  if (error[0]?.location) {
    return res.status(HttpStatusCodes.BAD_REQUEST).json(error)
  }

  console.log("sending", error.status || HttpStatusCodes.INTERNAL_SERVER_ERROR)

  return res.sendStatus(error.status || HttpStatusCodes.INTERNAL_SERVER_ERROR)
}

// Add error handler
app.use(errorHandler)

export default app
