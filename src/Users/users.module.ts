import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { Users } from './users.entity';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Users])],
    controllers: [UsersController],
    providers: [UsersService, UsersRepository],
    exports: [UsersService],
})
export class UsersModule {};