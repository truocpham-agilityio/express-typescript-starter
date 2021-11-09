import {
  UniqueConstraintError,
  ValidationError,
  ValidationErrorItem,
} from "sequelize";

import Logger from "../../utils/logger";
import { HTTP_STATUS_CODE } from "../constants/http";
import { Response } from "../interfaces/response";
import { ValidationErrorDetail } from "../interfaces/errors";

export abstract class ErrorHandler {
  public handleUnknownError(error: Error): Response {
    Logger.error("UNKNOWN ERROR: ", error);

    return {
      data: {
        code: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
        message: error.message,
      },
      code: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
    };
  }

  public handleValidationError(error: ValidationError): Response {
    Logger.error("VALIDATION ERROR: ", error);

    const errors: ValidationErrorDetail[] = [];

    error.errors.forEach((errorItem: ValidationErrorItem) => {
      errors.push({
        type: "invalid",
        field: errorItem.path as string,
        message: `Field ${errorItem.path} is not valid.`,
      });
    });

    return {
      data: { errors },
      code: HTTP_STATUS_CODE.UNPROCESSABLE_ENTITY,
    };
  }

  public handleUniqueConstraintError(error: UniqueConstraintError): Response {
    Logger.error("UNIQUE CONSTRAINT ERROR: ", error);

    const errors: ValidationErrorDetail[] = [];

    error.errors.forEach((errorItem: ValidationErrorItem) => {
      errors.push({
        type: "duplicated",
        field: errorItem.path as string,
        message: `Field ${errorItem.path} already registered.`,
      });
    });

    return {
      data: { errors },
      code: HTTP_STATUS_CODE.UNPROCESSABLE_ENTITY,
    };
  }
}
