import { Router } from "express";

import userController from "../controllers/user";

export default (route: Router) => {
  route.post("/users", userController.create);
  route.get("/users", userController.find);
  route.get("/users/:id", userController.findOne);
  route.put("/users/:id", userController.update);
  route.delete("/users/:id", userController.delete);

  // route.post("/", async (req, res, next) => {
  //   // This should be a middleware or should be handled by a library like Joi.
  //   const userDTO = req.body;
  //   const isUserValid = validators.user(userDTO);
  //   if (!isUserValid) {
  //     return res.status(400).end();
  //   }
  // });

  // route.post(
  //   "/",
  //   validators.userSignup, // this middleware take care of validation
  //   async (req, res, next) => {
  //     // The actual responsability of the route layer.
  //     const userDTO = req.body;

  //     // Call to service layer.
  //     // Abstraction on how to access the data layer and the business logic.
  //     const { user, company } = await UserService.Signup(userDTO);

  //     // Return a response to client.
  //     return res.json({ user, company });
  //   },
  // );
};
