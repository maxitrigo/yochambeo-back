import { Injectable } from '@nestjs/common';
import { JobsRepository } from './jobs.repository';
import { Job } from './jobs.entity';
import { CreateJobDto } from './CreateJob.dto';
import { LessThan } from 'typeorm';

@Injectable()
export class JobsService {
    constructor(
        private readonly jobRepository: JobsRepository,
    ) {}
    
    findAll(): Promise<Job[]> {
        return this.jobRepository.findAll();
    }

    async getAllJobs(limit: number, offset: number) {
        return this.jobRepository.findPage(limit, offset);
    }
    
    create(jobData: CreateJobDto) {
        return this.jobRepository.create(jobData);
    }
    
    search(searchData) {
        return this.jobRepository.search(searchData);
    }

    removeOldJobs() {
        return this.jobRepository.delete();
    }
}
