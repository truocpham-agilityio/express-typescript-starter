import { Optional } from "sequelize";
import { UserInput } from "./user-interface";
import { TaskInput } from "./task-interface";

export interface ProjectAttributes {
  id: number;
  name: string;
  description?: string;
  createdById?: number;
  createdBy?: UserInput;
  tasks?: TaskInput[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type ProjectInput = Optional<ProjectAttributes, "id">;

export type ProjectOutput = Required<ProjectAttributes>;
