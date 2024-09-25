import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from 'dotenv';

dotenv.config();

const config = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  autoLoadEntities: true,
  synchronize: true,
  logging: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
};

export const dataSource = new DataSource(config as DataSourceOptions);
export default registerAs('typeorm', () => config);
