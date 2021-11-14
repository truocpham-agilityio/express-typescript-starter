import { Router } from "express";

import authController from "../controllers/auth-controller";

export default (route: Router) => {
  route.post("/signup", authController.create);
};
