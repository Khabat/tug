import { Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:'varchar', length: 256, nullable:false, unique:true})
  categoryName: string;
}
