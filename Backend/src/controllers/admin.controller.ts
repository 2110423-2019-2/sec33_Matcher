import { User, IUser } from '../models';

export default class AdminController {
    static async getAllUsers(req: any, res: any): Promise<void> {
        const users = await User.find({}).select('-password');
        res.json(users);
    }

    static async toggleBlacklist(req: any, res: any): Promise<void> {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        user.blacklist = !user.blacklist;
        user.save();
        res.json({ blacklist: user.blacklist });
    }
}
