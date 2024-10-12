import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { CreateUsersDto } from "./createUsers.dto";

@Injectable()
export class UsersService {
    constructor(
        private readonly usersRepository: UsersRepository
    ) {}

    async findBySearchValue(searchValue) {
        return await this.usersRepository.findBySearchValue(searchValue);
    }

    async createUser(UserData: CreateUsersDto) {
        return await this.usersRepository.createUser(UserData)

    }


 }