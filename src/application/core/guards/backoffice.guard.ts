import { EUserRole } from '../../../domain/auth/user';
import RoleGuard from './role-guard.guard';

const BackofficeGuard = RoleGuard(EUserRole.BACKOFFICE);
export default BackofficeGuard;