import { Body, Controller, Get, Post, Query, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './CreateJob.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/Auth/auth.guard';


@Controller('jobs')
export class JobsController {
    constructor(private readonly jobsService: JobsService) {}

    @Get()
    async getJobs(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
        return this.jobsService.getAllJobs(page, limit);
    }

    @Get('search')
    async search(@Body() searchData) {
        return this.jobsService.search(searchData);
    }

    @Post()
    @UseGuards(AuthGuard)
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

}
