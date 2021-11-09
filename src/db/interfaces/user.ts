// export interface User {
//   id: number;
//   email: string;
//   name: string;
//   role?: string;
//   createdAt: Date;
//   updatedAt: Date;
//   deletedAt?: Date;
// }

import { Optional } from "sequelize";

export interface UserAttributes {
  id: number;
  email: string;
  name: string;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface UserInput extends Optional<UserAttributes, "id"> {}

export interface UserOutput extends Required<UserAttributes> {}
