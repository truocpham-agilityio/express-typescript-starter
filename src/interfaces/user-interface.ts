import { Optional } from "sequelize";

export interface UserAttributes {
  id: number;
  email: string;
  name: string;
  password?: string;
  salt?: string;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type UserInput = Optional<UserAttributes, "id">;

export type UserOutput = Omit<Required<UserAttributes>, "password" | "salt">;

export interface RegisterOutput {
  cookie: string;
  user: UserOutput;
}
