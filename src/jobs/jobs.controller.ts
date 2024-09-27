import { Body, Controller, Get, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './CreateJob.dto';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('jobs')
export class JobsController {
    constructor(private readonly jobsService: JobsService) {}

    @Get('all')
    async findAll() {
        return this.jobsService.findAll();
    }

    @Get()
    async getJobs(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
        return this.jobsService.getAllJobs(page, limit);
    }

    @Get('search')
    async search(@Body() searchData) {
        return this.jobsService.search(searchData);
    }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async create(
        @UploadedFile() file: Express.Multer.File,
        @Body() jobData: CreateJobDto) {
        return this.jobsService.create(file, jobData);
    }
}
