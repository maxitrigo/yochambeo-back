import { Body, Controller, Get, Post } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { Job } from './jobs.entity';
import { CreateJobDto } from './CreateJob.dto';


@Controller('jobs')
export class JobsController {
    constructor(private readonly jobsService: JobsService) {}

    @Get()
    async findAll(): Promise<Job[]> {
        return this.jobsService.findAll();
    }

    @Post()
    async create(@Body() jobData: CreateJobDto) {
        return this.jobsService.create(jobData);
    }
}
