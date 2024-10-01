import { Module } from '@nestjs/common';
import { JobsModule } from './jobs/jobs.module';
import { ConfigModule } from '@nestjs/config';
import typeormConfig, { dataSource } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobCleanupService } from './job-cleanup/job-cleanup.service';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { InstagramModule } from './instagram/instagram.module';
import { MercadopagoModule } from './mercadopago/mercadopago.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeormConfig],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        ...dataSource.options,
      })
    }),
    JobsModule,
    CloudinaryModule,
    InstagramModule,
    MercadopagoModule
  ],
  controllers: [],
  providers: [JobCleanupService],
})
export class AppModule {}
