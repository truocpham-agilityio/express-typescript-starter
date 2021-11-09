import { Optional } from "sequelize";

import { CreateUserDTO } from "./user-dto";

export interface CreateProjectDTO {
  id?: number;
  name: string;
  description: string;
  createdBy: CreateUserDTO;
}

export type UpdateProjectDTO = Optional<CreateUserDTO, "id">;

export type FilterProjectsDTO = {
  isDeleted?: boolean;
  includeDeleted?: boolean;
};
