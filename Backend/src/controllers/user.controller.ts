import { User } from '../models';
import userHandlers = require('../utils/userHandlers');

export default class UserController {
    async createUser(req: any, res: any): Promise<void> {
        const hash = userHandlers.generateHash(req.body.password);
        const user = new User({
            username: req.body.username,
            password: hash
        });
        await user.save();
        res.send("register complete");
    }

    async hello(req: any, res: any): Promise<void> {
        res.send('Hello World!');
    }
}
