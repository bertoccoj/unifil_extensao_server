import { Module } from '@nestjs/common';
import { DatabaseConnection } from 'src/core/database/database-connection';
import { DatabaseModule } from 'src/core/database/database.module';
import { DataSource } from 'typeorm';
import { entitiesAndRepositories } from '.';

const providers = [
    ...entitiesAndRepositories.map(([entity, repository]) => ({
        provide: repository,
        useFactory: (datasource: DataSource) => datasource.getRepository(entity).extend((repository as any).extensions ?? {}), inject: [DatabaseConnection],
    })),
];

@Module({
    imports: [
        DatabaseModule,
    ],
    providers,
    exports: providers,
})
export class DomainModule { }
