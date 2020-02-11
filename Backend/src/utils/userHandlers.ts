import bcrypt from 'bcryptjs';
import { SALT_ROUNDS } from '../const';
import HttpErrors from 'http-errors';

export const generateHash = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, SALT_ROUNDS);
};

export const ensureLoggedIn = (role?: string | string[]) => async (req: any, res: any, next: any): Promise<void> => {
    if (!req.isAuthenticated()) {
        next(new HttpErrors.Unauthorized());
    }
    if (role) {
        const userRole = req.user.role;
        if (Array.isArray(role)) {
            if (role.indexOf(userRole) !== -1) next(new HttpErrors.Unauthorized());
        } else {
            if (role !== userRole) next(new HttpErrors.Unauthorized());
        }
    }
    next();
};
