import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { Job } from './jobs.entity';
import { CreateJobDto } from './CreateJob.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { InstagramService } from 'src/instagram/instagram.service';

@Injectable()
export class JobsRepository {
  constructor(
    @InjectRepository(Job)
    private readonly jobsRepository: Repository<Job>,
    private readonly CloudinaryService: CloudinaryService,
    private readonly InstagramService: InstagramService,
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
  
  async create(profileImage: Express.Multer.File, instagramImage: Express.Multer.File, jobData: CreateJobDto){
    
    const newJob = new Job();
    
    //imagen de perfil a cloudinary
    if (profileImage) {
        const image = await this.CloudinaryService.uploadImage(profileImage);
        newJob.imgUrl = image.secure_url;
        newJob.imgId = image.public_id;
    } else {
        newJob.imgUrl = null;
        newJob.imgId = null;
    }

    //imagen a instagram
    if (instagramImage) {
      await this.InstagramService.postToInstagram(instagramImage, jobData.description);
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
    const oneMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const jobsToDelete = await this.jobsRepository.find({
        where: {
            createdAt: LessThan(oneMonthAgo)
        }
    })

    for (const job of jobsToDelete) {
        if(job.imgId){
            await this.CloudinaryService.deleteImage(job.imgId);
        }

    }
    await this.jobsRepository.delete({ createdAt: LessThan(oneMonthAgo) });
  }

}