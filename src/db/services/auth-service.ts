import * as jwt from "jsonwebtoken";

import Logger from "../../utils/logger";
import Users from "../models/user";
import { CrudService } from "../../core/services/crud-service";
import { TokenData, UserInput, UserOutput } from "../../interfaces";
import config from "../../config";
import { RegisterOutput } from "../../interfaces";
import UserService from "./user-service";

export default class AuthenticationService extends CrudService {
  public model = Users;
  public modelName = "users";

  private _createToken = (user: UserOutput): TokenData => {
    Logger.debug(`user param: ${JSON.stringify(user)}`);
    const expiresIn = 60 * 60; // an hour
    const secret = config.jwtSecret as string;
    const dataStoredInToken = {
      _id: user.id,
    };
    Logger.debug(`dataStoredInToken: ${JSON.stringify(dataStoredInToken)}`);

    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
    };
  };

  private _createCookie(tokenData: TokenData) {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
  }

  public register = async (payload: UserInput): Promise<RegisterOutput> => {
    const userService = new UserService();
    const user = await userService.create(payload);

    const tokenData = this._createToken(user);
    Logger.debug(`tokenData: ${JSON.stringify(tokenData)}`);

    const cookie = this._createCookie(tokenData);
    Logger.debug(`cookie: ${cookie}`);

    return {
      cookie,
      user,
    };
  };

  public loggingIn = async (payload: any): Promise<any> => {};

  public loggingOut = async (payload: any): Promise<any> => {};
}
