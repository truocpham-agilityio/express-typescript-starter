import { Router } from "express";

import { authRoutes, userRoutes, projectRoutes, taskRoutes } from "./routes";

export default () => {
  const route = Router();

  authRoutes(route);
  userRoutes(route);
  projectRoutes(route);
  taskRoutes(route);

  return route;
};
