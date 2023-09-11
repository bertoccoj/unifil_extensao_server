import { EUserRole } from '../../../domain/auth/user';
import RoleGuard from './role-guard.guard';

const AdminGuard = RoleGuard(EUserRole.ADMIN);
export default AdminGuard;