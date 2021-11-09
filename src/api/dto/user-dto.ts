import { Optional } from "sequelize";

export type CreateUserDTO = {
  id?: number;
  email: string;
  name: string;
  role?: string;
};

export type UpdateUserDTO = Optional<CreateUserDTO, "email">;

export type FilterUsersDTO = {
  isDeleted?: boolean;
  includeDeleted?: boolean;
};
