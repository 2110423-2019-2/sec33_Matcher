import { Task } from '../models';
import { containAll, matchAny, inRange } from '../utils/utils';
import HttpErrors from 'http-errors';

export default class TaskController {
    static fields = ['title', 'location', 'availableTime', 'photoStyle', 'price'];
    static photoStyles = ['Not Specified'];

    static async createTask(req: any, res: any): Promise<void> {
        if (!TaskController.checkPrecondition(req)) throw new HttpErrors.BadRequest();

        const task = new Task({
            title: req.body.title,
            description: req.body.description,
            location: req.body.location,
            owner: req.user._id,
            availableTime: req.body.availableTime,
            photoStyle: req.body.photoStyle,
            price: req.body.price,
            image: req.body.image,
            createTime: new Date(),
        });

        await task.save();
        res.json({ status: 'success' });
    }

    static checkPrecondition(req: any): boolean {
        if (!containAll(req.body, TaskController.fields)) return false;
        if (!inRange(req.body.title.length, 1, 20)) return false;
        if (!matchAny<string>(req.body.photoStyle, TaskController.photoStyles)) return false;
        if (req.body.price < 0) return false;

        return true;
    }
}
