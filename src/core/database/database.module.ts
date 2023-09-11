import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { entities } from '../../domain';
import { Environment } from '../constants/environment';
import { DatabaseConnection } from './database-connection';

const datasource = new DataSource({
  type: 'postgres',
  host: Environment.postgres.host,
  port: Environment.postgres.port,
  username: Environment.postgres.username,
  password: Environment.postgres.password,
  database: Environment.postgres.database,
  entities,
  synchronize: true,
} as PostgresConnectionOptions);

const databaseConnection = {
  provide: DatabaseConnection,
  useFactory: async () => {
    DatabaseConnection.datasource = await datasource.initialize();
    return DatabaseConnection.datasource;
  },
};

@Module({
  providers: [databaseConnection],
  exports: [databaseConnection],
})
export class DatabaseModule { }
