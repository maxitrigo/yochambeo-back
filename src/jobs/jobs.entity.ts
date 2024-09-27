import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity()
export class Job {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({
    type: 'varchar',
    nullable: true
  })
  imgUrl: string;

  @Column({
    type: 'varchar',
    nullable: true
  })
  imgId: string;

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
    type: 'varchar',
    nullable: false
  })
  salary: string;

  @Column({
    type: 'text',
    nullable: false
  })
  requirements: string;

  @Column({
    type: 'varchar',
    nullable: true
  })
  phone: string;

  @Column({
    type: 'varchar',
    nullable: false
  })
  email: string;

  @Column({
    type: 'varchar',
    nullable: true
  })
  website: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createdAt: Date;
  
}
