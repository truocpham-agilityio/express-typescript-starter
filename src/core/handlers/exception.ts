import { UniqueConstraintError, ValidationError } from "sequelize";

import { ErrorHandler } from "./error";

export abstract class ExceptionHandler extends ErrorHandler {
  private _ERROR_TYPES = [
    {
      type: ValidationError,
      func: this.handleValidationError,
    },
    {
      type: UniqueConstraintError,
      func: this.handleUniqueConstraintError,
    },
  ];

  public get ERROR_TYPES(): any {
    return this._ERROR_TYPES;
  }

  public set ERROR_TYPES(value) {
    this._ERROR_TYPES = [...this._ERROR_TYPES, ...value];
  }

  public getParseFunction = (error: Error) => {
    for (const errorItem of this._ERROR_TYPES) {
      if (error instanceof errorItem.type) {
        return errorItem.func;
      }
    }

    return this.handleUnknownError;
  };

  public handleErrors = (error: Error): any => {
    const handleFunction = this.getParseFunction(error);
    return handleFunction(error as ValidationError);
  };
}
