import { Injectable } from '@nestjs/common';
import { JobsRepository } from './jobs.repository';
import { Job } from './jobs.entity';
import { CreateJobDto } from './CreateJob.dto';

@Injectable()
export class JobsService {
    constructor(
        private readonly jobRepository: JobsRepository,
    ) {}
    
    findAll(): Promise<Job[]> {
        return this.jobRepository.findAll();
    }
    
    create(jobData: CreateJobDto) {
        return this.jobRepository.create(jobData);
    }
}
