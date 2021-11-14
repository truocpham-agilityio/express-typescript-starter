import { Mapper } from "../core/infra/mapper";
import { UserOutput } from "../interfaces";

export default class UserMapper extends Mapper<UserOutput> {
  public static toDomain(user: UserOutput): UserOutput {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt || null,
    };
  }
}
