import { User, IUser } from '../models';
import { generateHash } from '../utils/userHandlers';
import HttpErrors from 'http-errors';
import bcrypt from 'bcryptjs';

export default class UserController {
    async createUser(req: any, res: any): Promise<void> {
        // Preconditions
        if (req.body.role != 'photographer' && req.body.role != 'customer') {
            throw new HttpErrors.BadRequest();
        }

        const hash = await generateHash(req.body.password);
        const user = new User({
            email: req.body.email,
            password: hash,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            role: req.body.role,
            createTime: new Date()
        });
        await user.save();
        res.json({ status: 'success' });
    }

    async loginLocal(email, password, done): Promise<any> {
        const user: IUser = await User.findOne({ email });
        if (!await bcrypt.compare(password, user.password)) return done(null, false);
        return done(null, user);
    }

    async login(req: any, res: any): Promise<void> {
        res.json({ status: "success" })
    }

    async hello(req: any, res: any): Promise<void> {
        res.send('Hello World!');
    }

}
