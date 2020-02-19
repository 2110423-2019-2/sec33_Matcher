import { User } from '../models';
import { generateHash } from '../utils/userHandlers';
import HttpErrors from 'http-errors';
import validator from 'validator';

export default class UserController {
    static async createUser(req: any, res: any): Promise<void> {
        const fields = ['email', 'password', 'firstname', 'lastname', 'role'];
        //validate input ; pre-condition
        const check = await UserController.validateInput(req.body, fields);
        if (!check) throw new HttpErrors.BadRequest();
        const hash = await generateHash(req.body.password);
        const user = new User({
            email: req.body.email,
            password: hash,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            role: req.body.role,
            createTime: new Date(),
        });
        console.log(user.email, user.password);
        await user.save();
        res.json({ status: 'success' });
    }

    static async hello(req: any, res: any): Promise<void> {
        res.send('Hello World!');
    }
    static async getProfile(req: any, res: any): Promise<void> {
        res.json({
            createTime: req.user.createTime,
            email: req.user.email,
            firstname: req.user.firstname,
            lastname: req.user.lastname,
            role: req.user.role,
        });
    }
    static async updateProfile(req: any, res: any): Promise<void> {
        //add fields by requested update and for only legal update field
        const fields = [];
        if (req.body.includes('firstname')) {
            fields.push('firstname');
        }
        if (req.body.includes('lastname')) {
            fields.push('lastname');
        }
        if (req.body.includes('password')) {
            fields.push('password');
        }
        //additional precondition from validate input
        if (!UserController.validateInput(req.body, fields)) {
            throw new HttpErrors.BadRequest();
        } else {
            if (fields.includes('firstname')) {
                console.log('LOG:', req.user_id);
                await User.findByIdAndUpdate({ _id: req.user._id }, { firstname: req.body.firstname });
            }

            if (fields.includes('lastname'))
                await User.findByIdAndUpdate({ _id: req.user._id }, { lastname: req.body.lastname });

            if (fields.includes('password')) {
                const hash = await generateHash(req.body.password);
                await User.findByIdAndUpdate({ _id: req.user._id }, { password: hash });
            }
            res.json({ status: 'success' });
        }
    }

    static async validateInput(body: any, fields: string[]): Promise<boolean> {
        // Preconditions begin
        const inRange = (x: number, lowerBound: number, upperBound: number): boolean => {
            return x >= lowerBound && x <= upperBound;
        };

        const fieldCheck = (body: any, fields: string[]): boolean =>
            fields.every((field): boolean => {
                return body.hasOwnProperty(field);
            });

        // Precondition : Should contains all require fields
        if (!fieldCheck(body, fields)) return false;

        if (fields.includes('role')) {
            // Precondition : Role should be either "photographer" or "customer"
            if (body.role != 'photographer' && body.role != 'customer') return false;
        }

        if (fields.includes('email')) {
            // Precondition : Should reject bad email
            if (!validator.isEmail(body.email)) return false;
            // Precondition : Email must be unique
            if (await User.exists({ email: body.email })) return false;
        }

        // Precondition : Firstname and Lastname length must be between 2 and 20 characters
        if (fields.includes('firstname')) {
            if (!inRange(body.firstname.length, 2, 20)) return false;
        }

        if (fields.includes('lastname')) {
            if (!inRange(body.lastname.length, 2, 20)) return false;
        }

        if (fields.includes('password')) {
            // Precondition : Password length must be between 8 and 20 characters
            if (!inRange(body.password.length, 8, 20)) return false;
        }
        // Preconditions end
        return true;
    }
}
