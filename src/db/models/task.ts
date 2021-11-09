import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";

import Users from "./user";
import Projects from "./project";

@Table
export default class Tasks extends Model {
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

  @Column(DataType.DATE)
  dueDate!: Date;

  @ForeignKey(() => Users)
  @Column
  assigneeId!: number;

  @BelongsTo(() => Users)
  assignee!: Users;

  @ForeignKey(() => Users)
  @Column
  reporterId!: number;

  @BelongsTo(() => Users)
  reporter!: Users;
}
