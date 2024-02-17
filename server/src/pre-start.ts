/**
 * Pre-start is where we want to place things that must run BEFORE the express
 * server is started. This is useful for environment variables, command-line
 * arguments, and cron-jobs.
 */

// NOTE: DO NOT IMPORT ANY SOURCE CODE HERE
import path, { dirname } from "node:path"
import { fileURLToPath } from "node:url"

import { config } from "dotenv"
import { parse } from "ts-command-line-args"

// **** Setup **** //

// Command line arguments
const args = parse({
  env: {
    alias: "e",
    defaultValue: "development",
    type: String,
  },
  watch: {
    alias: "w",
    defaultValue: false,
    type: Boolean,
  },
})

// Set the env file
const dotenvConfig = config({
  path: path.join(
    dirname(fileURLToPath(import.meta.url)),
    `../../env/.env.${args.env}`,
  ),
})

if (dotenvConfig.error) {
  throw dotenvConfig.error
}
