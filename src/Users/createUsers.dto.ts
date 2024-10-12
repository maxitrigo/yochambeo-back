import { Entity } from "typeorm";

@Entity()
export class CreateUsersDto {
    email: string;
    password: string;
}