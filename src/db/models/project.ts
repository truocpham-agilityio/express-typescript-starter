import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
} from "sequelize-typescript";

import Users from "./user";
import Tasks from "./task";
import { ProjectAttributes, ProjectInput } from "../interfaces";

@Table
class Projects
  extends Model<ProjectAttributes, ProjectInput>
  implements ProjectAttributes
{
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description!: string;

  @ForeignKey(() => Users)
  @Column
  createdById!: number;

  @BelongsTo(() => Users)
  createdBy!: Users;

  @HasMany(() => Tasks)
  tasks!: Tasks[];

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  @DeletedAt
  deletedAt!: Date;
}

export default Projects;
