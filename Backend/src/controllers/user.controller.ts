import { User } from '../models';
import { generateHash } from '../utils/userHandlers';
import HttpErrors from 'http-errors';

export default class UserController {
    async createUser(req: any, res: any): Promise<void> {
        // Preconditions begin
        const fields = ['email', 'password', 'firstname', 'lastname', 'role'];

        // Precondition : Role should be either "photographer" or "customer"
        if (req.body.role != 'photographer' && req.body.role != 'customer') {
            throw new HttpErrors.BadRequest();
        }

        // Precondition : Should contains all require fields
        if (
            !fields.every(field => {
                return req.body.hasOwnProperty(field);
            })
        ) {
            throw new HttpErrors.BadRequest();
        }
        // Preconditions end

        const hash = await generateHash(req.body.password);
        const user = new User({
            email: req.body.email,
            password: hash,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            role: req.body.role,
            createTime: Date.now,
        });
        await user.save();
        res.json({ status: 'success' });
    }

    async hello(req: any, res: any): Promise<void> {
        res.send('Hello World!');
    }
}
