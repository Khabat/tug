import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany} from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class SubCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:'varchar', length: 256, nullable:false, unique:true})
  categoryName: string;

  @ManyToMany(() => Product, (product) => product.subCategories)
  products: Product[] ;

}
