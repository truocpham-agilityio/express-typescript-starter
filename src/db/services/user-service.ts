import * as bcrypt from "bcrypt";

import Logger from "../../utils/logger";
import UserDal from "../dal/user-dal";
import Users from "../models/user";
import { CrudService } from "../../core/services/crud-service";
import { UserInput, UserOutput } from "../../interfaces";
import UserMapper from "../../mapper/user-mapper";

export default class UserService extends CrudService {
  public model = Users;
  public modelName = "users";

  /**
   * Override
   * @param payload
   * @returns
   */
  public create = async (payload: UserInput): Promise<UserOutput> => {
    const foundUser = await UserDal.findOne(payload.email);
    Logger.debug(`Found user: ${JSON.stringify(foundUser)}`);
    if (foundUser !== null) {
      throw new Error("UserWithThatEmailAlreadyExistsException");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(payload.password as string, salt);
    const user = await UserDal.create({
      ...payload,
      password: hashedPassword,
      salt,
    });
    Logger.debug(`Created user: ${JSON.stringify(user)}`);

    return UserMapper.toDomain(user);
  };

  public findOrCreate = async (payload: UserInput): Promise<UserOutput> => {
    return UserDal.findOrCreate(payload);
  };

  public findUserByEmail = async (email: string): Promise<UserOutput> => {
    return UserDal.getByEmail(email);
  };
}
