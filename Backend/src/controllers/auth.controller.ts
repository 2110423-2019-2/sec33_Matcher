import { User, IUser } from '../models';
import bcrypt from 'bcryptjs';
import HttpErrors from 'http-errors';

export default class AuthController {
    static async loginLocal(email: string, password: string, done: any): Promise<any> {
        const user: IUser = await User.findOne({ email });
        if (!user) {
            return done(new HttpErrors.Unauthorized('This email is not registered!'), false);
        } else if (!(await bcrypt.compare(password, user.password))) {
            return done(new HttpErrors.Unauthorized('Wrong Password!'), false);
        } else if (user.blacklist === true) {
            return done(new HttpErrors.Unauthorized('The account is banned!'), false);
        }
        return done(null, user);
    }

    static async login(req: any, res: any): Promise<void> {
        res.json({ status: 'success' });
    }

    static async logout(req: any, res: any): Promise<void> {
        await req.logout();
        res.json({ status: 'success' });
    }

    static async whoami(req: any, res: any): Promise<void> {
        res.json(req.user);
    }
}
