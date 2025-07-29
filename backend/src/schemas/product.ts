// product.ts
import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
} from 'sequelize-typescript';

export interface ProductCreationAttributes {
  name: string;
  result: string;
  days: number;
  category: string;
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

  @AllowNull(false)
  @Column(DataType.STRING)
  category!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  image!: string;
}
