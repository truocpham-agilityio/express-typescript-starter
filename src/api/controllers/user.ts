import { Request, Response } from "express";

import { HTTP_MESSAGE } from "../../core/constants/http";
import { CreateUserDTO } from "../dto/user-dto";
import CrudController from "../../core/controllers/crud";
import UserService from "../../db/services/user";

class UserController extends CrudController {
  public service = new UserService();

  /**
   * Overrides create a new user
   * @param req request data
   * @param res response data
   * @returns {void}
   */
  public create = async (req: Request, res: Response) => {
    try {
      const payload = req.body as CreateUserDTO;
      const created = await this.service.findOrCreate(payload);

      return this.returnCreated(res, created, HTTP_MESSAGE.CREATED);
    } catch (error) {
      return this.returnServerError(res, error.message);
    }
  };
}

export default new UserController();
