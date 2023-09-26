import { Module } from '@nestjs/common';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { AuthController } from './auth/auth.controller';
import { SolicitacaoController } from './solicitacao/solicitacao.controller';
import { UsersController } from './users/users.controller';

const controllers = [
    AuthController,
    SolicitacaoController,
    UsersController,
];

@Module({
    imports: [
        NestjsFormDataModule,
        InfrastructureModule,
    ],
    controllers,
})
export class ApplicationModule { }
