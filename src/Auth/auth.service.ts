import { ConflictException, Injectable } from "@nestjs/common";
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { UsersService } from "src/Users/users.service";
import { Role } from "./roles.enum";
import { CreateUsersDto } from "src/Users/createUsers.dto";

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService
    ){}

    async signUp(userData: CreateUsersDto) {
        const user = await this.usersService.findBySearchValue({ email: userData.email });

        if(user) {
            throw new ConflictException('El usuario ya existe');
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10);

        await this.usersService.createUser({ ...userData, password: hashedPassword });
        const createdUser = await this.usersService.findBySearchValue({ email: userData.email });

        return {
            isAdmin: createdUser.isAdmin,
            isLogged: true,
        }


    }

    async signIn(email: string, password: string) {
        const user = await this.usersService.findBySearchValue({email: email });
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!user || !isPasswordValid) {
            throw new ConflictException('El usuario o la contraseña son incorrectos');
        }

        const payload = {
            sub: user.id,
            id: user.id,
            email: user.email,
            role: user.isAdmin ? Role.ADMIN : Role.USER
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

        return {
            isLogged: true,
            isAdmin: user.isAdmin,
            token: token
        }
    }
}