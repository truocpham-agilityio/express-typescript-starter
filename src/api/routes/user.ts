import { Router } from "express";

import userController from "../controllers/user-controller";

export default (route: Router) => {
  route.get("/users", userController.find);
  route.get("/users/:id", userController.findOne);
  route.put("/users/:id", userController.update);
  route.delete("/users/:id", userController.delete);
};
