import { User } from '../models';
import { generateHash } from '../utils/userHandlers';

export default class UserController {
    async createUser(req: any, res: any): Promise<void> {
        const hash = await generateHash(req.body.password);
        const user = new User({
            username: req.body.username,
            password: hash,
            name: req.body.name,
            role: req.body.role,
            createTime: req.body.createTime,
        });
        await user.save();
        res.json({ status: 'success' });
    }

    async hello(req: any, res: any): Promise<void> {
        res.send('Hello World!');
    }
}
