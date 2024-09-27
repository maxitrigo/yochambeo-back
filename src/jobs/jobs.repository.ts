import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { Job } from './jobs.entity';
import { CreateJobDto } from './CreateJob.dto';
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import { bufferToStream } from 'buffer-to-stream';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class JobsRepository {
  constructor(
    @InjectRepository(Job)
    private readonly jobsRepository: Repository<Job>,
    private readonly CloudinaryService: CloudinaryService
  ) {}
  
  async findAll(): Promise<Job[]> {
    return this.jobsRepository.find();
  }
  
  async search(searchData): Promise<Job[]> {
      const jobs =this.jobsRepository.find({where: searchData})
      return jobs
  }

  async findPage(page: number, limit: number): Promise<Job[]> {
    return this.jobsRepository.find({
        order: {
          createdAt: 'DESC',
        },
        skip: limit * (page - 1),
        take: limit,
    });
  }
  
  async create(file: Express.Multer.File, jobData: CreateJobDto){
    
    const newJob = new Job();
    if (file) {
        const image = await this.CloudinaryService.uploadImage(file);
        newJob.imgUrl = image.secure_url;
        newJob.imgId = image.public_id;
    } else {
        newJob.imgUrl = null;
        newJob.imgId = null;
    }

    newJob.title = jobData.title;
    newJob.description = jobData.description;
    newJob.location = jobData.location;
    newJob.company = jobData.company;
    newJob.salary = jobData.salary;
    newJob.requirements = jobData.requirements;
    newJob.phone = jobData.phone;
    newJob.email = jobData.email;
    newJob.website = jobData.website;

    return await this.jobsRepository.save(newJob);
  }

  async delete(){
    const fiveMinutesAgo = new Date(Date.now() -5 * 60 * 1000);
    const oneMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const jobsToDelete = await this.jobsRepository.find({
        where: {
            createdAt: LessThan(fiveMinutesAgo)
        }
    })

    for (const job of jobsToDelete) {
        if(job.imgId){
            await this.CloudinaryService.deleteImage(job.imgId);
        }

    }
    await this.jobsRepository.delete({ createdAt: LessThan(fiveMinutesAgo) });
  }

}