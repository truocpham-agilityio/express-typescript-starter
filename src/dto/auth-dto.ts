import { Optional } from "sequelize";
import { CreateUserDTO } from "./user-dto";

export type RegistrationDTO = Optional<CreateUserDTO, "id">;

export type LoginDTO = {
  email: string;
  password: string;
};
