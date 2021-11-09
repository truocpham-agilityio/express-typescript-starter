import express, { Application, Request, Response } from "express";
import cors from "cors";

import routes from "./api";
import initDb from "./db/init";
import config from "./config";
import Logger from "./utils/logger";

const startServer = async (): Promise<void> => {
  const app: Application = express();
  const allowedOrigins = [`http://localhost:${config.port}`];
  const options: cors.CorsOptions = {
    origin: allowedOrigins,
  };

  app.use(express.json());
  app.use(cors(options));
  app.use(config.api.prefix, routes());

  app.get("/", async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).send({
      message: `Welcome to the starter API! \n Endpoints available at http://localhost:${config.port}/api/v1`,
    });
  });

  app
    .listen(config.port, () => {
      Logger.info(`Server listening on port: ${config.port}`);
    })
    .on("error", (err: NodeJS.ErrnoException): void => {
      Logger.error(err);
      process.exit(1);
    });

  const sequelize = initDb();
  await sequelize.sync();
};

startServer();
