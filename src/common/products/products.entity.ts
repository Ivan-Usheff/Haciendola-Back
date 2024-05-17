import { Column, Entity } from "typeorm";
import { BaseEntity } from "utils/entities/base.entity";


@Entity('products')
export class ProductsEntity extends BaseEntity {
  
  @Column({
    name: 'handle', 
    type: 'varchar'
  })
  handle: string;
  
  @Column({
    name: 'title', 
    type: 'varchar'
  })
  title: string;
  
  @Column({
    name: 'description', 
    type: 'text',
  })
  description: string;
  
  @Column({
    name: 'sku', 
    type: 'bigint',
    update: false,
    unique: true
  })
  sku: number;
  
  @Column({
    name: 'grams', 
    type: 'integer'
  })
  grams: number;
  
  @Column({
    name: 'stock', 
    type: 'integer'
  })
  stock: number;
  
  @Column({
    name: 'price', 
    type: 'integer'
  })
  price: number;
  
  @Column({
    name: 'compare_price', 
    type: 'integer'
  })
  comparePrice: number;
  
  @Column({
    name: 'bar_code', 
    type: 'bigint'
  })
  barCode: number;

}