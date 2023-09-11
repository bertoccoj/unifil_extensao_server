import { Module } from '@nestjs/common';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { AuthController } from './auth/auth.controller';
import { SolicitacaoController } from './solicitacao/solicitacao.controller';
import { NestjsFormDataModule } from 'nestjs-form-data';

const controllers = [
    AuthController,
    SolicitacaoController,
];

@Module({
    imports: [
        NestjsFormDataModule,
        InfrastructureModule,
    ],
    controllers,
})
export class ApplicationModule { }
