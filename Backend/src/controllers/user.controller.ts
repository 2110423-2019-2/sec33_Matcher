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

    async loginUser(email, password, done): Promise<void> {
        console.log(email, password);
        User.findOne({ email: email }, async (err, user: IUser) => {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if(!await bcrypt.compare(password, user.password)){
                return done(null, false);
            }
            return done(null, user);
        });
    }

    async hello(req: any, res: any): Promise<void> {
        res.send('Hello World!');
    }

}
