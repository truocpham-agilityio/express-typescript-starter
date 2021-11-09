import dotenv from "dotenv";
import { join } from "path";

import { DOT_ENV_NOT_FOUND } from "../core/constants/errors";

const dotenvConfig = dotenv.config();
if (dotenvConfig.error) {
  throw new Error(DOT_ENV_NOT_FOUND);
}

/**
 * Set the environment variables by default
 */
process.env.NODE_ENV = process.env.NODE_ENV || "development";
process.env.PORT = process.env.PORT || "3000";

const isDev = process.env.NODE_ENV === "development";

export default {
  api: {
    prefix: "/api/v1",
  },

  nodeEnv: process.env.NODE_ENV,

  port: parseInt(process.env.PORT, 10),

  logs: {
    level: process.env.LOG_LEVEL || "silly",
  },

  database: {
    name: process.env.DB_NAME || "sqlite",
    driver: process.env.DB_DRIVER || "sqlite",
    storage: join(__dirname, "../../db/database.sqlite"),
    logging: isDev,
  },
};
