/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, UpdateDateColumn} from 'typeorm';


@Entity()
export class Brand {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  brand_name: string;

  @Column()
  brand_industry: string;

  @Column()
  brand_url: string;

  @Column({ nullable: true })
  brand_description: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;


  
}