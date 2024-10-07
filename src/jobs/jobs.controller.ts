import { Body, Controller, Get, Post, Query, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './CreateJob.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/Auth/AuthGuard';


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
    @UseInterceptors(FilesInterceptor('files'))
    async create(
        @UploadedFiles() files: Express.Multer.File[],
        @Body() jobData: CreateJobDto
    ) {
        const [profileImage, instagramImage] = files;
        // Verificar qué se está recibiendo
        console.log(profileImage, instagramImage, jobData);
        return this.jobsService.create(profileImage, instagramImage, jobData);
    }

}
