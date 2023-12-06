import path from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

const dbConnection: DataSourceOptions = {
  type: 'postgres',
  host: process.env.HOST,
  port: Number(process.env.PORT),
  username: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  synchronize: true,
  logging: false,
  extra: {
    max: '100',
    min: '50',
  },
  entities: [path.join(__dirname, '../**/*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, '../**/*.migrations{.ts,.js}')],
  subscribers: [path.join(__dirname, '../**/*.subscriber{.ts,.js}')],
};

export const DatabaseConnection = new DataSource(dbConnection);
