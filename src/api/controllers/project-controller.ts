import { Request, Response } from "express";

import CrudController from "../../core/controllers/crud-controller";
import { HTTP_MESSAGE } from "../../core/constants/http";
import ProjectService from "../../db/services/project-service";
import { CreateProjectDTO } from "../../dto/project-dto";

class ProjectController extends CrudController {
  public service = new ProjectService();

  public create = async (req: Request, res: Response) => {
    try {
      const payload = req.body as CreateProjectDTO;
      const created = await this.service.create(payload);

      return this.returnCreated(res, created, HTTP_MESSAGE.CREATED);
    } catch (error) {
      return this.returnServerError(res, error.message);
    }
  };
}

export default new ProjectController();
