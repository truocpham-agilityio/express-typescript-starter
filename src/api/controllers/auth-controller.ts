import { Request, Response } from "express";

import { HTTP_MESSAGE } from "../../core/constants/http";
import { CreateUserDTO } from "../../dto/user-dto";
import CrudController from "../../core/controllers/crud-controller";
import AuthenticationService from "../../db/services/auth-service";

class AuthenticationController extends CrudController {
  public service = new AuthenticationService();

  /**
   * Overrides create a new user
   * @param req request data
   * @param res response data
   * @returns {void}
   */
  public create = async (req: Request, res: Response) => {
    try {
      const payload = req.body as CreateUserDTO;
      const registered = await this.service.register(payload);

      return this.returnCreated(res, registered, HTTP_MESSAGE.CREATED);
    } catch (error) {
      return this.returnServerError(res, error.message);
    }
  };
}

export default new AuthenticationController();
