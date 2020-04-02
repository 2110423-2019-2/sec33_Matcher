import { User, IUser } from '../models';

export default class AdminController {
    static async getAllUsers(req: any, res: any): Promise<void> {
        const users = await User.find({}).select('-password');
        res.json(users);
    }
}