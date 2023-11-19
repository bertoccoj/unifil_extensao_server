import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import RequestWithUser from 'src/infrastructure/auth/models/request-with-user';
import { EUserRole } from '../../../domain/auth/user';

const RoleGuard = (role: EUserRole): Type<CanActivate> => {
    class RoleGuardMixin implements CanActivate {
        canActivate(context: ExecutionContext) {
            const request: RequestWithUser = context.switchToHttp().getRequest();
            const user = request.user;

            if (role === EUserRole.ADMIN) {
                return user?.role === EUserRole.ADMIN;
            }

            if (role === EUserRole.BACKOFFICE) {
                return [EUserRole.ADMIN, EUserRole.BACKOFFICE].includes(user.role);
            }

            if (role === EUserRole.USER) {
                return [EUserRole.ADMIN, EUserRole.BACKOFFICE, EUserRole.USER].includes(user.role);
            }
            return false;
        }
    }

    return mixin(RoleGuardMixin);
}

export default RoleGuard;