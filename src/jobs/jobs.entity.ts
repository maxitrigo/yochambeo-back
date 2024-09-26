import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity()
export class Job {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({
    type: 'varchar',
    nullable: false
  })
  imgUrl: string;

  @Column({
    type: 'varchar',
    nullable: false
  })
  title: string;

  @Column({
    type: 'text',
    nullable: false
  })
  description: string;

  @Column({
    type: 'varchar',
    nullable: false
  })
  location: string;
  
  @Column({
    type: 'varchar',
    nullable: false
  })
  company: string;

  @Column({
    type: 'int',
    nullable: false
  })
  salary: number;

  @Column({
    type: 'varchar',
    nullable: false
  })
  requirements: string;

  @Column({
    type: 'varchar',
    nullable: false
  })
  phone: string;

  @Column({
    type: 'varchar',
    nullable: false
  })
  email: string;

  @Column({
    type: 'varchar',
    nullable: false
  })
  website: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createdAt: Date;
  
}
