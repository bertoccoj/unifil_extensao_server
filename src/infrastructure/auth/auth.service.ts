import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { Environment } from '../../core/constants/environment';
import { UserRepository } from '../../domain/auth/user';
import { PostgresErrorCode } from '../core/postgress-error-code';
import { EUserRole } from './../../domain/auth/user';
import { TokenPayload } from './models/token-payload';
import { RegisterUserDto } from './models/user-dto';

@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) { }

    async register(registrationData: RegisterUserDto) {
        try {
            const hashedPassword = await bcrypt.hash(
                registrationData.password,
                Environment.bcryptSaltRounds,
            );
            const hasAdmin = await this.userRepository.hasAdmin();

            const createdUser = await this.userRepository.save({
                email: registrationData.email,
                displayName: registrationData.displayName,
                password: hashedPassword,
                role: hasAdmin ? EUserRole.USER : EUserRole.ADMIN,
            });

            delete createdUser.password;

            return createdUser;
        } catch (error) {
            if (error?.code === PostgresErrorCode.UniqueViolation) {
                throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST);
            }
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getAuthenticatedUser(email: string, plainTextPassword: string) {
        try {
            const user = await this.userRepository.getByEmail(email);
            await this.verifyPassword(plainTextPassword, user.password);

            delete user.password;

            return user;
        } catch (error) {
            throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
        }
    }

    private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
        const isPasswordMatching = await bcrypt.compare(
            plainTextPassword,
            hashedPassword
        );
        if (!isPasswordMatching) {
            throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
        }
    }

    public getCookieWithJwtToken(userId: number) {
        const payload: TokenPayload = { userId };
        const token = this.jwtService.sign(payload);
        return {
            token,
            cookie: `Authentication=${token}; HttpOnly; Path=/; Max-Age=${Environment.jwt.expirationTime}`,
        }
    }


    public getCookieForLogOut() {
        return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
    }
}
