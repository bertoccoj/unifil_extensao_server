import RequestWithUser from 'src/infrastructure/auth/models/request-with-user';
import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { EUserRole } from '../../../domain/auth/user';

const RoleGuard = (role: EUserRole): Type<CanActivate> => {
    class RoleGuardMixin implements CanActivate {
        canActivate(context: ExecutionContext) {
            const request: RequestWithUser = context.switchToHttp().getRequest();
            const user = request.user;

            return user?.role === role;
        }
    }

    return mixin(RoleGuardMixin);
}

export default RoleGuard;