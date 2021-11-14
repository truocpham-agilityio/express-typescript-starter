import { Optional } from "sequelize";

import { UserInput } from "./user-interface";
import { ProjectInput } from "./project-interface";

export interface TaskAttributes {
  id: number;
  projectId?: number;
  project?: ProjectInput;
  title: string;
  description?: string;
  archived?: boolean;
  completed?: boolean;
  priority?: number;
  dueDate?: Date;
  assigneeId?: number | null;
  assignee?: UserInput;
  reporterId?: number;
  reporter?: UserInput;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type TaskInput = Optional<TaskAttributes, "id">;

export type TaskOutput = Required<TaskAttributes>;
