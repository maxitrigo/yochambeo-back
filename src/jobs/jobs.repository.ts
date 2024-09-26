import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
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
  
  async search(searchData): Promise<Job[]> {
      const jobs =this.jobsRepository.find({where: searchData})
      return jobs
  }

  async findPage(page: number, pageSize: number): Promise<Job[]> {
    return this.jobsRepository.find({
        order: {
          createdAt: 'DESC',
        },
        skip: pageSize * (page - 1),
        take: pageSize,
    });
  }
  
  async create(jobData: CreateJobDto){
    return this.jobsRepository.save(jobData);
  }

  async delete(){
    // const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
    const oneMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    await this.jobsRepository.delete({ createdAt: LessThan(oneMonthAgo) });
  }
}