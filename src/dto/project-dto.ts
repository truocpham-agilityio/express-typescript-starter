import { Optional } from "sequelize";

import { CreateUserDTO } from "./user-dto";

export interface ProjectDTO {
  id?: number;
  name?: string;
  description?: string;
  createdBy?: CreateUserDTO;
}

export type CreateProjectDTO = Pick<Required<ProjectDTO>, "name" | "createdBy">;

export type UpdateProjectDTO = Optional<ProjectDTO, "id">;

export type FilterProjectsDTO = Pick<CreateProjectDTO, "name">;
