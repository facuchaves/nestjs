import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// @Entity()
export class GenericEntity {
  
  // @PrimaryGeneratedColumn()
  id: number;

  // @Column()
  name: string;

  // @Column()
  score: number;

}