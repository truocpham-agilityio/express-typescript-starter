import { Optional } from "sequelize";

import { CreateUserDTO } from "./user-dto";
import { CreateProjectDTO } from "./project-dto";

export interface CreateTaskDTO {
  id?: number;
  title: string;
  description?: string;
  assignee?: CreateUserDTO;
  reporter: CreateUserDTO;
  project: CreateProjectDTO;
}

export type UpdateTaskDTO = Optional<CreateTaskDTO, "id">;

export type FilterTasksDTO = {
  isDeleted?: boolean;
  includeDeleted?: boolean;
};
