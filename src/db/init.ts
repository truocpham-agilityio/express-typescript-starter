import { Dialect } from "sequelize";
import { Sequelize } from "sequelize-typescript";

import config from "../config";
import { Projects, Users, Tasks } from "./models";

const initDb = (): Sequelize => {
  const { database } = config;
  const sequelize = new Sequelize({
    database: database.name,
    dialect: database.driver as Dialect,
    // storage: ":memory:",
    storage: database.storage,
    logging: database.logging,
  });
  sequelize.addModels([Projects, Users, Tasks]);

  return sequelize;
};

export default initDb;
