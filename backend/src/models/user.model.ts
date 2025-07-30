import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    AllowNull,
  } from 'sequelize-typescript';

export interface UserCreationAttributes {
    email: string;
    password: string;
}  

@Table({
    tableName: 'users',
    timestamps: false,
})
export class User extends Model<User, UserCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  email!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  password!: string;
} 