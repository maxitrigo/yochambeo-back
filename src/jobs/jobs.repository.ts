import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './jobs.entity';
import { CreateJobDto } from './CreateJob.dto';

@Injectable()
export class JobsRepository {
  constructor(
    @InjectRepository(Job)
    private readonly jobsRepository: Repository<Job>,
  ) {}

  async findAll(): Promise<Job[]> {
    return this.jobsRepository.find();
  }

  async create(jobData: CreateJobDto){
    return this.jobsRepository.save(jobData);
  }
}