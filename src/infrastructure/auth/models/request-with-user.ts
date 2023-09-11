import { Request } from 'express';
import { User } from '../../../domain/auth/user';

interface RequestWithUser extends Request {
    user: User;
}

export default RequestWithUser;
