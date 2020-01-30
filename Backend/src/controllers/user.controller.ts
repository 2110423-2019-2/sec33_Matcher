import { User } from '../models';

export default class UserController {
    async createUser(req: any, res: any): Promise<void> {
        const user = new User(req.body);
        await user.save();
        res.send();
    }
}