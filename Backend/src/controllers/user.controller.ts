import { User, Task } from '../models';
import { generateHash } from '../utils/userHandlers';
import HttpErrors from 'http-errors';
import validator from 'validator';
import { Role } from '../const';
import pick from 'object.pick';
import { Types } from 'mongoose';
import nodemailer from 'nodemailer';
import cheerio from 'cheerio';
import fs from 'fs';
import { containAll, inRange } from '../utils/utils';

export default class UserController {
    static async hello(req: any, res: any): Promise<void> {
        res.send('Hello World!');
    }

    static async validateInput(body: any, fields: string[]): Promise<boolean> {
        if (!containAll(body, fields)) return false;

        if (fields.includes('email') && !validator.isEmail(body.email) && (await User.exists({ email: body.email })))
            return false;
        if (fields.includes('password') && !inRange(body.password.length, 8, 20)) return false;
        if (fields.includes('firstname') && !inRange(body.firstname.length, 2, 20)) return false;
        if (fields.includes('lastname') && !inRange(body.lastname.length, 2, 20)) return false;
        if (fields.includes('role') && body.role !== Role.PHOTOGRAPHER && body.role !== Role.CUSTOMER) return false;

        return true;
    }

    static async createUser(req: any, res: any): Promise<void> {
        const fields = ['email', 'password', 'firstname', 'lastname', 'role'];
        const inputBody = pick(req.body, fields);
        if (!(await UserController.validateInput(inputBody, fields))) throw new HttpErrors.BadRequest();

        const hash = await generateHash(req.body.password);
        const user = new User({
            email: req.body.email,
            password: hash,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            role: req.body.role,
            image: req.body.image,
            createTime: new Date(),
        });
        await user.save();
        res.json({ status: 'success' });
    }

    private static async getUserAvgRating(userId: string): Promise<number> {
        const avgRating = await Task.aggregate([
            { $match: { acceptedBy: Types.ObjectId(userId) } },
            {
                $group: {
                    _id: null,
                    total: { $avg: '$ratingScore' },
                },
            },
        ]);
        if (avgRating.length == 0) {
            return 0;
        } else {
            return avgRating[0].total;
        }
    }

    static async getProfile(req: any, res: any): Promise<void> {
        if (!req.params.userId) {
            res.json({
                createTime: req.user.createTime,
                email: req.user.email,
                firstname: req.user.firstname,
                lastname: req.user.lastname,
                role: req.user.role,
            });
        } else {
            const id = new Types.ObjectId(req.params.userId);
            const user = await User.findById({ _id: id });
            if (!user) {
                throw new HttpErrors.NotFound();
            }
            res.json({
                firstname: user.firstname,
                lastname: user.lastname,
                role: user.role,
                createTime: user.createTime,
                score: await UserController.getUserAvgRating(req.params.userId),
            });
        }
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

    static async checkDelete(req: any): Promise<boolean> {
        const id = new Types.ObjectId(req.params.userId);
        const userProfile = await User.findById(id);
        if (!userProfile) {
            return false;
        } else if (req.user.role === Role.ADMIN) {
            return true;
        } else {
            if (!req.user._id.equals(req.params.userId)) {
                return false;
            }
            return true;
        }
    }

    static async deleteProfile(req: any, res: any): Promise<void> {
        if (!(await UserController.checkDelete(req))) throw new HttpErrors.BadRequest();
        await User.findByIdAndDelete(req.params.userId);
        res.json({ status: 'success' });
    }

    static async notifyUserByEmail(task: any): Promise<any> {
        const photographer = await User.findById({ _id: task.acceptedBy });
        const owner = await User.findById({ _id: task.owner });
        const data = fs.readFileSync(__dirname + '/../template/notify_owner.html', 'utf8');
        const $ = cheerio.load(data);
        $('#task-title').text(task.title);
        $('#task-location').text(task.location);
        $('#dummy-text').text(task.description);
        $('#owner-name').text(owner.firstname + ' ' + owner.lastname);
        $('#photographer-name').text([photographer.firstname + ' ' + photographer.lastname]);
        $('#task-status').text(task.status);
        const smtp = {
            host: 'smtp.mailtrap.io',
            port: 2525,
            auth: {
                user: '55ab6b1f60ab44',
                pass: 'e005cf73b0626a',
            },
        };
        // const smtp = {
        //     host: 'in-v3.mailjet.com',
        //     port: 587,
        //     auth: {
        //         user: '9418771ef8b38718549b6575fcc1456f',
        //         pass: '<redacted>'
        //     }
        // };
        const mail = {
            from: 'no-reply@sec33matcher.io',
            to: owner.email,
            subject: 'Your task got a match!',
            html: $.html(),
        };
        const smtpTransport = nodemailer.createTransport(smtp);
        smtpTransport.sendMail(mail);
        smtpTransport.close();
    }
}
