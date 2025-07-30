import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Category } from './category.model';

export interface ProductCreationAttributes {
  name: string;
  result: string;
  days: number;
  categoryId: number;
  image: string;
}

@Table({
  tableName: 'products',
  timestamps: false,
})
export class Product extends Model<Product, ProductCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  result!: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  days!: number;

  @ForeignKey(() => Category)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  categoryId!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  image!: string;

  @BelongsTo(() => Category)
  category!: Category;
}
