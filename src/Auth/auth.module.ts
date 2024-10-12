import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { UsersModule } from 'src/Users/users.module';
import { RolesGuard } from './roles.guard';
import { JobsModule } from 'src/jobs/jobs.module';

@Module({
    imports: [UsersModule, JobsModule],
    controllers: [AuthController],
    providers: [AuthService, AuthGuard, RolesGuard],
    exports: [AuthService]
})
export class AuthModule {};