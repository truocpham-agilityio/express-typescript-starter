import { Router } from "express";

import { userRoutes, projectRoutes } from "./routes";

export default () => {
  const route = Router();

  userRoutes(route);
  projectRoutes(route);

  return route;
};
