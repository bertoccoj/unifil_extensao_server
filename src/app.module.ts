import { CacheModule, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { join } from 'path';
import { ApplicationModule } from './application/application.module';
import { CommonModule } from './core/common.module';
import { Environment } from './core/constants/environment';
import { DatabaseModule } from './core/database/database.module';
import { DomainModule } from './domain/domain.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';

@Module({
  imports: [
    DatabaseModule,
    DomainModule,
    ScheduleModule.forRoot(),
    InfrastructureModule,
    ApplicationModule,
    CacheModule.register({
      isGlobal: true,
    }),
    CommonModule,
    ServeStaticModule.forRoot({
      serveRoot: '/static/fotos/solicitacoes',
      rootPath: Environment.fotoSolicitacaoFolder,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../frontend', 'dist'),
    }),
    NestjsFormDataModule,
  ],
  providers: [],
})
export class AppModule { }
