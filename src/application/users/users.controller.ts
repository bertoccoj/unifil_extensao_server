import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { User } from 'src/domain';
import { IUsersFacade } from 'src/domain/users/i_users_facade';
import RequestWithUser from 'src/infrastructure/auth/models/request-with-user';
import AdminGuard from '../core/guards/admin.guard';
import JwtAuthenticationGuard from '../core/guards/jwt-authentication.guard';

@Controller('users')
export class UsersController {
    constructor(
        private usersFacade: IUsersFacade,
    ) { }

    @Get('with-pending-roles')
    @UseGuards(JwtAuthenticationGuard, AdminGuard)
    async withPendingRoles() {
        return this.usersFacade.getUsersWithPendingRoleRequest();
    }

    @Get('all')
    @UseGuards(JwtAuthenticationGuard, AdminGuard)
    async allUsers() {
        return this.usersFacade.getAllUsers();
    }

    @Post('decide-role/:id')
    @UseGuards(JwtAuthenticationGuard, AdminGuard)
    async decideRole(@Param('id') userId: User['id'], @Body() body: { accept: boolean }) {
        return this.usersFacade.decideRole(userId, body.accept);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Post('request-role')
    async requestRole(@Req() request: RequestWithUser, @Body() requestRolePayload) {
        return await this.usersFacade.requestRole(request.user, requestRolePayload);
    }

}
