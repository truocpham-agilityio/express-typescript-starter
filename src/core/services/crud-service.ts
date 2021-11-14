import { Op } from "sequelize";

import { Filter } from "../filters/filter";
import SearchFilter from "../filters/search";
import { PaginateOptions } from "../interfaces/paginate-options";

export abstract class CrudService {
  abstract model: any;
  abstract modelName: string;

  private _filters: Filter[] = [SearchFilter];

  public get filters(): Filter[] {
    return this._filters;
  }

  public set filters(value) {
    this._filters = [...this._filters, ...value];
  }

  public findOne = async (id: number | string): Promise<any> => {
    return this.model.findByPk(id);
  };

  public find = async (options: any): Promise<any> => {
    const where = await this.processFilters(options);
    const findOptions = await this.buildFindOptions(options);
    const data = await this.model.findAndCountAll({ ...findOptions, where });

    return this.buildPaginationMetadata(data, options);
  };

  public create = async (object: any): Promise<any> => {
    return this.model.create(object);
  };

  public update = async (id: number | string, data: any): Promise<any> => {
    return this.model.update(data, { where: { id }, sideEffects: false });
  };

  public updateWhere = async (data: any, where: any): Promise<any> => {
    return this.model.update(data, { where });
  };

  public delete = async (id: number | string): Promise<boolean> => {
    return this.model.destroy({ where: { id } });
  };

  public deleteWhere = async (where: any): Promise<boolean> => {
    return this.model.destroy({ where });
  };

  // TODO
  public processFilters = async (options: any): Promise<any> => {
    // let where = {};
    // if (this._filters.length) {
    //   where[Op.and] = [];
    // }

    // this._filters.forEach((filter): any => {
    //   where = filter.execute(where, this.model, options);
    // });

    // return where;

    return {};
  };

  public buildFindOptions = async (options: PaginateOptions): Promise<any> => {
    const limit = Number(options.limit);
    const offset = (Number(options.page) - 1) * limit;
    const order = [[options.sort, options.order]];

    return { limit, offset, order };
  };

  public buildPaginationMetadata = async (
    data: any,
    options: any,
  ): Promise<any> => {
    const limit = Number(options.limit);
    const total = data.count / limit;
    const totalPages =
      total > Math.floor(total) ? Math.floor(total + 1) : total;

    return {
      ...data,
      itemsPerPage: limit,
      currentPage: Number(options.page),
      totalPages,
    };
  };
}
