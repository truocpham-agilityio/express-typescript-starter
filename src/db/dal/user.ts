import { Users } from "../models";
import { GetAllUsersFilters } from "./types";
import { UserInput, UserOutput } from "../interfaces";
import { NOT_FOUND, UNABLE_CREATE_USER } from "../../core/constants/errors";

class UserDal {
  public model = Users;

  public create = async (payload: UserInput): Promise<UserOutput> => {
    return Users.create(payload);
  };

  public findOrCreate = async (payload: UserInput): Promise<UserOutput> => {
    try {
      const [user] = await Users.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: payload,
      });

      return user;
    } catch (error) {
      throw new Error(UNABLE_CREATE_USER);
    }
  };

  public update = async (
    id: number,
    payload: Partial<UserInput>,
  ): Promise<UserOutput> => {
    const user = await Users.findByPk(id);
    if (!user) {
      throw new Error(NOT_FOUND);
    }
    const updatedUser = await (user as Users).update(payload);

    return updatedUser;
  };

  public getById = async (id: number): Promise<UserOutput> => {
    const user = await Users.findByPk(id);
    if (!user) {
      throw new Error(NOT_FOUND);
    }

    return user;
  };

  public deleteById = async (id: number): Promise<boolean> => {
    const deletedUserCount = await Users.destroy({
      where: { id },
    });

    return !!deletedUserCount;
  };

  public getAll = async (
    filters?: GetAllUsersFilters,
  ): Promise<UserOutput[]> => {
    return Users.findAll({
      ...((filters?.isDeleted || filters?.includeDeleted) && {
        paranoid: true,
      }),
    });
  };
}

export default new UserDal();
