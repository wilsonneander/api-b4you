import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    AllowNull,
    HasMany,
  } from 'sequelize-typescript';
import { Product } from './product.model';

export interface CategoryCreationAttributes {
    id?: number;
    name: string;
}  

@Table({
    tableName: 'categories',
    timestamps: false,
})
export class Category extends Model<Category, CategoryCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string;

  @HasMany(() => Product)
  products!: Product[];
}