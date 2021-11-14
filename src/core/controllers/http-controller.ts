import { Response } from "express";

import { ExceptionHandler } from "../handlers/exception-handler";
import { HTTP_MESSAGE, HTTP_STATUS_CODE } from "../constants/http";

export default abstract class HttpController extends ExceptionHandler {
  public return = (
    res: Response,
    data: any = {},
    message: any = null,
    error: boolean = false,
    code: number = HTTP_STATUS_CODE.OK,
  ): Response => {
    return res.status(code).send({ message, data, error, code });
  };

  public returnData = (
    res: Response,
    data: any = {},
    code: number = HTTP_STATUS_CODE.OK,
  ): Response => {
    return res.status(code).send(data);
  };

  public returnMessage = (
    res: Response,
    message: string = HTTP_MESSAGE.OK,
    code: number = HTTP_STATUS_CODE.OK,
    error: boolean = false,
  ): Response => {
    return res.status(code).send({ message, error });
  };

  public returnCreated = (
    res: Response,
    data: any = {},
    message: string = HTTP_MESSAGE.CREATED,
  ): Response => {
    return this.return(res, data, message, false, HTTP_STATUS_CODE.CREATED);
  };

  public returnBadRequest = (
    res: Response,
    message: string = HTTP_MESSAGE.BAD_REQUEST,
  ): Response => {
    return this.returnMessage(res, message, HTTP_STATUS_CODE.BAD_REQUEST, true);
  };

  public returnUnauthorized = (
    res: Response,
    message: string = HTTP_MESSAGE.UNAUTHORIZED,
  ): Response => {
    return this.returnMessage(
      res,
      message,
      HTTP_STATUS_CODE.UNAUTHORIZED,
      true,
    );
  };

  public returnNotFound = (
    res: Response,
    message: string = HTTP_MESSAGE.NOT_FOUND,
  ): Response => {
    return this.returnMessage(res, message, HTTP_STATUS_CODE.NOT_FOUND, true);
  };

  public returnServerError = (
    res: Response,
    message: string = HTTP_MESSAGE.INTERNAL_SERVER_ERROR,
  ): Response => {
    return this.returnMessage(
      res,
      message,
      HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
      true,
    );
  };

  public processException = (res: Response, error: Error): Response => {
    const { errorData, statusCode } = this.handleErrors(error);
    return this.returnData(res, errorData, statusCode);
  };
}
