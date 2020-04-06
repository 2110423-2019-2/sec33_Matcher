import { User, Task } from '../models';
import { generateHash } from '../utils/userHandlers';
import HttpErrors from 'http-errors';
import validator from 'validator';
import { Role } from '../const';
import pick from 'object.pick';
import { Types } from 'mongoose';

export default class UserController {
    private static async getUserAvgRating(userId: string): Promise<number> {
        const avgRating = await Task.aggregate([
            { '$match': { acceptedBy: Types.ObjectId(userId) } },
            {
                '$group': {
                    _id: null,
                    total: { '$avg': '$ratingScore' }
                }
            }
        ])
        return avgRating[0].total;
    }

    static async createUser(req: any, res: any): Promise<void> {
        const fields = ['email', 'password', 'firstname', 'lastname', 'role'];
        //validate input ; pre-condition
        const inputBody = pick(req.body, fields);
        const check = await UserController.validateInput(inputBody, fields);
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
        const fields = ['email', 'password', 'firstname', 'lastname', 'role', 'createTime'];
        const inputBody = pick(req.body, fields);
        if (
            inputBody.hasOwnProperty('role') ||
            inputBody.hasOwnProperty('createTime') ||
            inputBody.hasOwnProperty('email') ||
            !UserController.validateInput(inputBody, fields)
        ) {
            throw new HttpErrors.BadRequest();
        } else {
            if (inputBody.hasOwnProperty('password')) {
                const hash = await generateHash(inputBody.password);
                inputBody.password = hash;
            }
            await User.findByIdAndUpdate(req.user._id, inputBody);
        }

        res.json({ status: 'success' });
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
            if (body.role !== Role.PHOTOGRAPHER && body.role !== Role.CUSTOMER) return false;
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
        return true;
    }

    static async getUserProfile(req: any, res: any) {
        const userProfile = await User.findById(req.params.id);
        if (!userProfile) throw new HttpErrors.NotFound();

        let comments = [];
        if (userProfile.role === Role.PHOTOGRAPHER) {
            comments = await Task.find({
                ratingScore: { $exists: true },
                acceptedBy: userProfile._id,
            })
                .select('ratingScore comment')
                .populate('owner', 'firstname lastname');
        }

        res.json({
            firstname: userProfile.firstname,
            lastname: userProfile.lastname,
            role: userProfile.role,
            createTime: userProfile.createTime,
            score: await UserController.getUserAvgRating(req.params.id),
            comments: comments.map(comment => ({ 
                rating: comment.ratingScore,
                comment: comment.comment || '',
                ownerFirstname: comment.owner.firstname, 
                ownerLastname: comment.owner.lastname
            })),
        });
    }
}
