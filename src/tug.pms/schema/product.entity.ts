import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable} from 'typeorm';
import { Company } from './company.entity';
import { IsOptional } from 'class-validator';
import { Category } from './category.entity';
import { SubCategory } from './subcategory.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:'varchar', length: 256, nullable:false})
  productName: string;

  @Column({type:'varchar', length:100, nullable:true, unique:true})
  barcode: string;

  
  @ManyToOne(type=>Category, {nullable: false, onDelete:'RESTRICT', eager:true})
  category: Category;

  @ManyToMany(() => SubCategory, (subCategory) => subCategory.products)
  @JoinTable()
  subCategories: SubCategory[] ;
}
