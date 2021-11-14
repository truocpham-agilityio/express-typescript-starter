import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
} from "sequelize-typescript";

import { UserAttributes, UserInput } from "../../interfaces";

@Table({
  paranoid: true,
})
class Users extends Model<UserAttributes, UserInput> implements UserAttributes {
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
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  salt!: string;

  @Column({
    type: DataType.STRING,
    defaultValue: "user",
  })
  role!: string;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  @DeletedAt
  deletedAt!: Date;
}

export default Users;
