import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { Job } from './jobs.entity';
import { CreateJobDto } from './CreateJob.dto';


@Controller('jobs')
export class JobsController {
    constructor(private readonly jobsService: JobsService) {}

    @Get('all')
    async findAll() {
        return this.jobsService.findAll();
    }

    @Get()
    async getJobs(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
        const offset = (page - 1) * limit;
        return this.jobsService.getAllJobs(limit, offset);
    }

    @Get('search')
    async search(@Body() searchData) {
        return this.jobsService.search(searchData);
    }

    @Post()
    async create(@Body() jobData: CreateJobDto) {
        return this.jobsService.create(jobData);
    }
}
