import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

@Entity()
export class Users {
    
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    @Column({
        unique: true,
        type: 'varchar',
        length: 50,
        nullable: false
    })
    email: string

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false
    })    
    password: string

    @Column({
        type: 'boolean',
        default: false,
    })
    isAdmin: boolean

}