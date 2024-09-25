import { Module } from '@nestjs/common';
import { JobsModule } from './jobs/jobs.module';
import { ConfigModule } from '@nestjs/config';
import typeormConfig, { dataSource } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';


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
    JobsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
