import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CommonModule } from '../core/common.module';
import { Environment } from '../core/constants/environment';
import { DomainModule } from '../domain/domain.module';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { LocalStrategy } from './auth/strategies/local.strategy';
import { Geocoder } from './core/geocoder.service';
import { ImportadorDeCidades } from './core/importador-de-cidades';
import { SolicitacaoService } from './solicitacao/solicitacao.service';

const providers = [
    AuthService,
    JwtStrategy,
    LocalStrategy,
    SolicitacaoService,
    Geocoder,
    ImportadorDeCidades,
];

@Module({
    imports: [
        DomainModule,
        CommonModule,
        PassportModule,
        JwtModule.register({
            secret: Environment.jwt.secret,
            signOptions: {
                expiresIn: Environment.jwt.expirationTime,
            }
        }),
    ],
    providers,
    exports: providers,
})
export class InfrastructureModule { }
