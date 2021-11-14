import { Optional } from "sequelize";

export interface CreateUserDTO {
  id?: number;
  email: string;
  name: string;
  role?: string;
  password?: string;
}

export type UpdateUserDTO = Optional<CreateUserDTO, "email">;

export type FilterUsersDTO = Pick<Required<CreateUserDTO>, "email">;
