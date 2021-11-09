// import { NextFunction, Request, Response } from "express";

// import Logger from "../../utils/logger";
// import HttpException from "../../core/exceptions/HttpException";
// import { HTTP_STATUS_CODE } from "../../utils/constants";

// function logError(err: HttpException) {
//   Logger.error(err);
// }

// function logErrorMiddleware(
//   err: HttpException,
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) {
//   logError(err);
//   next(err);
// }

// function errorMiddleware(
//   err: HttpException,
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) {
//   const statusCode = err.statusCode || HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR;
//   const message = err.message || "Something went wrong!";

//   res.status(statusCode).send({
//     message,
//     statusCode,
//   });
// }

// export { logError, logErrorMiddleware, errorMiddleware };
