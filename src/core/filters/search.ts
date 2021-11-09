import { Op, WhereOptions } from "sequelize";

import { Filter } from "./filter";
import { isDateType, isNumberType } from "../../utils/functions";

class SearchFilter extends Filter {
  public execute(where: WhereOptions, model: any, options: any): any {
    if (options.hasOwnProperty("search") && options.search.length) {
      const attributes = model.rawAttributes;
      const fields = [];

      for (const field in attributes) {
        if (isDateType(attributes[field].type)) continue;
        const stringValue = `%${options.search}%`;
        const numberValue = Number(options.search);
        const isNumber = isNumberType(attributes[field].type) && numberValue;
        const OP = isNumber ? Op.eq : Op.like;
        fields.push({
          [field]: {
            [OP]: isNumber ? numberValue : stringValue,
          },
        });
      }

      where = {
        ...where,
        // [Op.and]: [...[Op.and], ...[{ [Op.or]: fields }]],
      };
    }

    return where;
  }
}

export default new SearchFilter();
