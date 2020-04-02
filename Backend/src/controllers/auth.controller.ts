import { User, IUser } from '../models';
import bcrypt from 'bcryptjs';

export default class AuthController {
    static async loginLocal(email: string, password: string, done: any): Promise<any> {
        const user: IUser = await User.findOne({ email });
        if (!user) {
            // no user in database
            return done(null, false);
        } else if (!(await bcrypt.compare(password, user.password))) {
            return done(null, false);
        } else if (user.blacklist === true) {
            // user is blacklisted
            return done(null, false);
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
