import { Request, Response } from "express";

import CrudController from "../../core/controllers/crud-controller";
import { HTTP_MESSAGE } from "../../core/constants/http";
import { CreateTaskDTO } from "../../dto/task-dto";
import TaskService from "../../db/services/task-service";

class TaskController extends CrudController {
  public service = new TaskService();

  public create = async (req: Request, res: Response) => {
    try {
      const payload = req.body as CreateTaskDTO;
      const created = await this.service.create(payload);

      return this.returnCreated(res, created, HTTP_MESSAGE.CREATED);
    } catch (error) {
      return this.returnServerError(res, error.message);
    }
  };
}

export default new TaskController();
