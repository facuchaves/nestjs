import { Max, Min } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'genericentity'})
export class GenericEntity {
  
  @PrimaryGeneratedColumn()
  entity_id: number;

  @Column()
  name: string;

  @Column({width:3})
  @Min(1)
  @Max(100)
  score: number;

}