import { User } from '../models';
import { generateHash } from '../utils/userHandlers';
import HttpErrors from 'http-errors';

export default class UserController {
    async createUser(req: any, res: any): Promise<void> {
        // Preconditions begin
        const fields = ['email', 'password', 'firstname', 'lastname', 'role'];
        const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

        const validateEmail = (email: string): boolean => {
            return re.test(String(email).toLowerCase());
        };

        // Precondition : Should contains all require fields
        if (
            !fields.every(field => {
                return req.body.hasOwnProperty(field);
            })
        ) {
            throw new HttpErrors.BadRequest();
        }

        // Precondition : Role should be either "photographer" or "customer"
        if (req.body.role != 'photographer' && req.body.role != 'customer') {
            throw new HttpErrors.BadRequest();
        }

        // Precondition : Should reject bad email
        if (!validateEmail(req.body.email)) {
            throw new HttpErrors.BadRequest();
        }

        // Precondition : Firstname and Lastname length must be between 2 and 20 characters
        if (
            req.body.firstname.length < 2 ||
            req.body.firstname.length > 20 ||
            req.body.lastname.length < 2 ||
            req.body.lastname.length > 20
        ) {
            throw new HttpErrors.BadRequest();
        }

        // Precondition : Password length must be between 8 and 20 characters
        if (req.body.password.length < 8 || req.body.password.length > 20) {
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
