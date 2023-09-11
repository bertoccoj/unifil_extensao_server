import { Body, Controller, Get, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common';
import express from 'express';
import RequestWithUser from 'src/infrastructure/auth/models/request-with-user';
import { RegisterUserDto } from '../../infrastructure/auth/models/user-dto';
import JwtAuthenticationGuard from '../core/guards/jwt-authentication.guard';
import { LocalAuthenticationGuard } from '../core/guards/local-authenticated.guard';
import { AuthService } from './../../infrastructure/auth/auth.service';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService,
    ) { }

    @Post('register')
    async register(@Body() registrationData: RegisterUserDto) {
        const user = await this.authService.register(registrationData);
        const { token } = this.authService.getCookieWithJwtToken(user.id);
        return {
            data: {
                ...user,
                token,
            }
        }
    }

    @HttpCode(200)
    @UseGuards(LocalAuthenticationGuard)
    @Post('log-in')
    async logIn(@Req() request: RequestWithUser, @Res() response: express.Response) {
        const { user } = request;
        const { cookie, token } = this.authService.getCookieWithJwtToken(user.id);
        response.setHeader('Set-Cookie', cookie);
        user.password = undefined;
        delete user.password;
        return response.send({ data: { ...user, token } });
    }


    @UseGuards(JwtAuthenticationGuard)
    @Post('log-out')
    async logOut(@Req() _request: RequestWithUser, @Res() response: express.Response) {
        response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
        return response.send({});
    }

    @HttpCode(200)
    @UseGuards(JwtAuthenticationGuard)
    @Get()
    authenticate(@Req() request: RequestWithUser) {
        const user = request.user;
        user.password = undefined;
        delete user.password;
        return user;
    }

}
