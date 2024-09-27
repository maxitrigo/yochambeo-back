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

    async getAllJobs(page: number, limit: number) {
        return this.jobRepository.findPage(page, limit);
    }
    
    create(file: Express.Multer.File, jobData: CreateJobDto) {
        return this.jobRepository.create(file, jobData);
    }
    
    search(searchData) {
        return this.jobRepository.search(searchData);
    }

    removeOldJobs() {
        return this.jobRepository.delete();
    }

}
