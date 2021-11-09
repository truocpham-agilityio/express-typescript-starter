import { Request, Response } from "express";

import HttpController from "./http";
import { CrudService } from "../services/crud";
import { PaginateOptions } from "../interfaces/paginate-options";
import { HTTP_MESSAGE, HTTP_STATUS_CODE } from "../constants/http";

export default abstract class CrudController extends HttpController {
  abstract service: CrudService;

  private _defaultFindOptions: PaginateOptions = {
    limit: 10,
    page: 1,
    order: "ASC",
    sort: "id",
  };

  public get defaultFindOptions(): PaginateOptions {
    return this._defaultFindOptions;
  }

  public set defaultFindOptions(options: PaginateOptions) {
    this._defaultFindOptions = { ...this._defaultFindOptions, ...options };
  }

  public buildOptions = async (query: any): Promise<any> => {
    for (const key in query) {
      if (query[key] === "") delete query[key];
    }

    query = { ...this.defaultFindOptions, ...query };

    if (!["ASC", "DESC"].includes(query.order)) {
      query.order = "ASC";
    }

    if (!Object.keys(this.service.model.rawAttributes).includes(query.sort)) {
      query.sort = "id";
    }

    return query;
  };

  public find = async (req: Request, res: Response) => {
    try {
      const filterOptions = await this.buildOptions(req.query);
      const data = await this.service.find(filterOptions);

      return this.returnData(res, data, HTTP_STATUS_CODE.OK);
    } catch (error) {
      return this.returnServerError(res, error.message);
    }
  };

  public findOne = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (!id) {
      return this.returnNotFound(
        res,
        `ID of ${this.service.modelName} is not valid`,
      );
    }

    try {
      const data = await this.service.findOne(id);
      return this.returnData(res, data, HTTP_STATUS_CODE.OK);
    } catch (error) {
      return this.returnServerError(res, error.message);
    }
  };

  public create = async (req: Request, res: Response) => {
    try {
      const payload = req.body;
      const created = await this.service.create(payload);

      return this.returnCreated(res, created, HTTP_MESSAGE.CREATED);
    } catch (error) {
      return this.returnServerError(res, error.message);
    }
  };

  public update = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (!id) {
      return this.returnNotFound(
        res,
        `ID of ${this.service.modelName} is not valid`,
      );
    }

    try {
      const payload = req.body;
      const updated = await this.service.update(id, payload);

      return this.returnData(res, updated, HTTP_STATUS_CODE.OK);
    } catch (error) {
      return this.returnServerError(res, error.message);
    }
  };

  public delete = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (!id) {
      return this.returnNotFound(
        res,
        `ID of ${this.service.modelName} is not valid`,
      );
    }

    try {
      const deleted = await this.service.delete(id);
      if (deleted) {
        return this.returnMessage(
          res,
          HTTP_MESSAGE.NO_CONTENT,
          HTTP_STATUS_CODE.NO_CONTENT,
          false,
        );
      }

      return this.returnBadRequest(
        res,
        `Error while deleting ${id} - ${this.service.modelName}`,
      );
    } catch (error) {
      return this.returnServerError(res, error.message);
    }
  };
}
