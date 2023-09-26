import { BadRequestException, Injectable } from '@nestjs/common';
import { User, UserRepository } from 'src/domain';
import { IUsersFacade } from 'src/domain/users/i_users_facade';
import { RequestRolePayload } from 'src/domain/users/request-role';
import { IsNull, Not } from 'typeorm';

enum ERequestRoleError {
    PERMISSION_PENDING = 1,
    ROLE_MUST_BE_HIGHER_THAN_CURRENT = 2,
}

@Injectable()
export class UsersFacadeImpl implements IUsersFacade {
    constructor(
        private userRepository: UserRepository,
    ) { }

    async getUsersWithPendingRoleRequest(): Promise<User[]> {
        const users = await this.userRepository.find({
            where: {
                requestedRole: Not(IsNull()),
            },
            select: {
                id: true,
                createdAt: true,
                displayName: true,
                email: true,
                role: true,
                requestedRole: true,
                updatedAt: true,
                password: false,
                solicitacoes: false,
            },
        });
        return users;
    }

    async getAllUsers(): Promise<User[]> {
        const users = await this.userRepository.find({
            select: {
                id: true,
                createdAt: true,
                displayName: true,
                email: true,
                role: true,
                requestedRole: false,
                updatedAt: true,
                password: false,
                solicitacoes: false,
            },
        });
        return users;
    }

    async requestRole(user: User, payload: RequestRolePayload) {
        if (user.requestedRole) {
            throw new BadRequestException(ERequestRoleError.PERMISSION_PENDING)
        }
        if (user.role >= payload.role) {
            throw new BadRequestException(ERequestRoleError.ROLE_MUST_BE_HIGHER_THAN_CURRENT);
        }

        user.requestedRole = payload.role;

        await this.userRepository.save(user);
    }

    async decideRole(userId: number, accept: boolean): Promise<any> {
        const user = await this.userRepository.findOneBy({ id: userId });

        if (accept) {
            user.role = user.requestedRole;
        }

        user.requestedRole = null;

        await this.userRepository.save(user);
    }

}