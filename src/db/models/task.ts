import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
} from "sequelize-typescript";

import Users from "./user";
import Projects from "./project";
import { TaskAttributes, TaskInput } from "../../interfaces";

@Table
class Tasks extends Model<TaskAttributes, TaskInput> implements TaskAttributes {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @ForeignKey(() => Projects)
  @Column
  projectId!: number;

  @BelongsTo(() => Projects)
  project!: Projects;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  title!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description!: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  archived!: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  completed!: boolean;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 1,
    validate: {
      min: 1,
      max: 4,
    },
  })
  priority!: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  dueDate!: Date;

  @ForeignKey(() => Users)
  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  assigneeId!: number;

  @BelongsTo(() => Users)
  assignee!: Users;

  @ForeignKey(() => Users)
  @Column
  reporterId!: number;

  @BelongsTo(() => Users)
  reporter!: Users;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  @DeletedAt
  deletedAt!: Date;
}

export default Tasks;
