import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'genericentity'})
export class GenericEntity {
  
  @PrimaryGeneratedColumn()
  entity_id: number;

  @Column()
  name: string;

  @Column()
  score: number;

}