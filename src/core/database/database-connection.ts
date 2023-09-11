import { DataSource } from 'typeorm';

export abstract class DatabaseConnection extends DataSource {
    static datasource: DataSource;
}
