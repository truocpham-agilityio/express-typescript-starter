import { Router } from "express";

import projectController from "../controllers/project-controller";

export default (route: Router) => {
  route.post("/projects", projectController.create);
  route.get("/projects", projectController.find);
  route.get("/projects/:id", projectController.findOne);
  route.put("/projects/:id", projectController.update);
  route.delete("/projects/:id", projectController.delete);
};
