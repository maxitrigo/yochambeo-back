import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Users } from "./users.entity";
import { CreateUsersDto } from "./createUsers.dto";

@Injectable()
export class UsersRepository {
    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
    ) {}

    async findBySearchValue(searchValue){
        const user = await this.usersRepository.findOne({ where: searchValue})
        return user
    }

    async createUser(UserData: CreateUsersDto){
        const newUser = this.usersRepository.save(UserData)
        return newUser
    }

 }