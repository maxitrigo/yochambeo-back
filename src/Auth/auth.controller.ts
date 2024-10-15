import { Body, Controller, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FileFieldsInterceptor} from '@nestjs/platform-express';
import { AuthGuard } from './auth.guard';
import { CreateJobDto } from 'src/jobs/CreateJob.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from './roles.enum';
import { CreateUsersDto } from 'src/Users/createUsers.dto';
import { RolesGuard } from './roles.guard';
import { JobsService } from 'src/jobs/jobs.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly AuthService: AuthService,
        private readonly jobsService: JobsService
    ){}

    @Post('signin')
    signIn(@Body() user){
        return this.AuthService.signIn(user.email, user.password)
    }

    
    @Post('publish')
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'profileImage', maxCount: 1 },
        { name: 'instagramImage', maxCount: 1 },
      ]))
    async create(
        @UploadedFiles() files: { profileImage?: Express.Multer.File[], instagramImage?: Express.Multer.File[] },
        @Body() jobData: CreateJobDto
    ) {
        const profileImage = files.profileImage ? files.profileImage[0] : null;
        const instagramImage = files.instagramImage ? files.instagramImage[0] : null;
        
        return this.jobsService.create(profileImage, instagramImage, jobData);
    }

    @Post('register')
    async register(@Body() UserData: CreateUsersDto) {
        return await this.AuthService.signUp(UserData)
    }

}