import { User } from '../models';
import { generateHash } from '../utils/userHandlers';
import HttpErrors from 'http-errors';
import validator from 'validator';
import userModel from '../models/user.model';

export default class UserController {
    static async createUser(req: any, res: any): Promise<void> {
        const fields = ['email', 'password', 'firstname', 'lastname', 'role'];
        //validate input ; pre-condition
        if(!this.validateInput(req, fields))
            throw new HttpErrors.BadRequest();

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

    static async updateProfile(req: any, res:any): Promise<void> {
        const fields = ['firstname', 'lastname', 'password'];
        //additional precondition from validate input
        if(!UserController.validateInput(req, fields))
            throw new HttpErrors.BadRequest();
        
        User.update({_id:req.user._id},{$rename: {'firstname': req.body.firstname, 'lastname': req.body.lastname, 'password': req.body.password}});
        
    }

    static async validateInput(req: any, fields: Array<string>): Promise<Boolean> {
        // Preconditions begin

        const inRange = (x: number, lowerBound: number, upperBound: number): boolean => {
            return x >= lowerBound && x <= upperBound;
        };

        const fieldCheck = (body: any, fields: string[]): boolean =>
            fields.every((field): boolean => {
                return body.hasOwnProperty(field);
            });

        // Precondition : Should contains all require fields
        if (!fieldCheck(req.body, fields)) return false;

        if ('role' in fields){
            // Precondition : Role should be either "photographer" or "customer"
            if (req.body.role != 'photographer' && req.body.role != 'customer') return false;
        }

        if ('email' in fields){
            // Precondition : Should reject bad email
            if (!validator.isEmail(req.body.email)) return false;
            // Precondition : Email must be unique
            if (await User.exists({ email: req.body.email })) return false;
        }

        // Precondition : Firstname and Lastname length must be between 2 and 20 characters
        if ('firstname' in fields){    
            if (!inRange(req.body.firstname.length, 2, 20)) return false;
        }

        if ('lastname' in fields){
            if(!inRange(req.body.lastname.length, 2, 20)) return false;
        }

        if ('password' in fields){
            // Precondition : Password length must be between 8 and 20 characters
            if (!inRange(req.body.password.length, 8, 20)) return false;
        }
        // Preconditions end

        return true;
    }
}
