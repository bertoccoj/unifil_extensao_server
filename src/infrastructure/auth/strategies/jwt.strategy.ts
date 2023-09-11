import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UserRepository } from 'src/domain/auth/user';
import { TokenPayload } from '../models/token-payload';
import { Environment } from 'src/core/constants/environment';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly userRepository: UserRepository,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
                return request?.cookies?.Authentication ?? (request?.headers?.authorization ?? request?.headers?.Authorization as string)?.replace('Bearer ', '');
            }]),
            secretOrKey: Environment.jwt.secret,
        });
    }

    async validate(payload: TokenPayload) {
        const user = await this.userRepository.getById(payload.userId);
        if (user) {
            return user;
        }
        throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
    }
}