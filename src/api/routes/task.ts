import { Router } from "express";

import taskController from "../controllers/task-controller";

export default (route: Router) => {
  route.post("/tasks", taskController.create);
  route.get("/tasks", taskController.find);
  route.get("/tasks/:id", taskController.findOne);
  route.put("/tasks/:id", taskController.update);
  route.delete("/tasks/:id", taskController.delete);
};
