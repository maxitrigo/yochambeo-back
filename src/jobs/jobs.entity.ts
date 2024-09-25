import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imgUrl: string;
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  location: string;
  
  @Column()
  company: string;

  @Column()
  salary: number;

  @Column()
  createdAt: Date;
  
}