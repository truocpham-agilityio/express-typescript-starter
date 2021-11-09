import UserDal from "../dal/user";
import Users from "../models/user";
import { CrudService } from "../../core/services/crud";
import { UserInput, UserOutput } from "../interfaces";

export default class UserService extends CrudService {
  public model = Users;
  public modelName = "users";

  public findOrCreate = async (payload: UserInput): Promise<UserOutput> => {
    return UserDal.findOrCreate(payload);
  };
}
