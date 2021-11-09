import { Optional } from "sequelize";
import { UserInput } from ".";
import { UserOutput } from "./user";

export interface ProjectAttributes {
  id: number;
  name: string;
  description: string;
  createdById?: number;
  createdBy?: UserInput;
  // tasks:
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface ProjectInput extends Optional<ProjectAttributes, "id"> {}

export interface ProjectOutput extends Required<ProjectAttributes> {}
