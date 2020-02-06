import { User } from '../models';
import { generateHash } from '../utils/userHandlers';
import HttpErrors from 'http-errors';
import validator from 'validator';

export default class UserController {
    async createUser(req: any, res: any): Promise<void> {
        // Preconditions begin
        const fields = ['email', 'password', 'firstname', 'lastname', 'role'];

        const inRange = (x, lowerBound, upperBound): boolean => {
            return x >= lowerBound && x <= upperBound;
        };

        const fieldCheck = (body, fields): boolean =>
            fields.every((field): boolean => {
                return body.hasOwnProperty(field);
            });

        // Precondition : Should contains all require fields
        if (!fieldCheck(req.body, fields)) throw new HttpErrors.BadRequest();

        // Precondition : Role should be either "photographer" or "customer"
        if (req.body.role != 'photographer' && req.body.role != 'customer') throw new HttpErrors.BadRequest();

        // Precondition : Should reject bad email
        if (!validator.isEmail(req.body.email)) throw new HttpErrors.BadRequest();

        // Precondition : Firstname and Lastname length must be between 2 and 20 characters
        if (!inRange(req.body.firstname.length, 2, 20) || !inRange(req.body.lastname.length, 2, 20))
            throw new HttpErrors.BadRequest();

        // Precondition : Password length must be between 8 and 20 characters
        if (!inRange(req.body.password.length, 8, 20)) throw new HttpErrors.BadRequest();
        // Preconditions end

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

    async hello(req: any, res: any): Promise<void> {
        res.send('Hello World!');
    }
}
