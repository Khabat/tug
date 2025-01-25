import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne} from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:'varchar', length: 256, nullable: false})
  companyName: string;

  @ManyToOne(type=>Product, {onDelete:'SET NULL', eager:true})
  product: Product;

}
