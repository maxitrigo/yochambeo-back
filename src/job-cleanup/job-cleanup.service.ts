import { Injectable } from '@nestjs/common';
import { JobsService } from 'src/jobs/jobs.service';
import * as cron from 'node-cron';

@Injectable()
export class JobCleanupService {
    constructor(private readonly jobsService: JobsService){
        this.scheduleJobCleanup();
    }

    scheduleJobCleanup(){
        cron.schedule('* * * * *', async () => {
            await this.jobsService.removeOldJobs();
        })
    }
}
