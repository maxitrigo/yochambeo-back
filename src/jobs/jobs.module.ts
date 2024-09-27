import { Module } from '@nestjs/common';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { JobsRepository } from './jobs.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './jobs.entity';
import { JobCleanupService } from 'src/job-cleanup/job-cleanup.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  imports: [TypeOrmModule.forFeature([Job])],
  controllers: [JobsController],
  providers: [JobsService, JobsRepository, JobCleanupService, CloudinaryService],
  exports: [JobsService]
})
export class JobsModule {}

