import { Task } from '../models';
import { containAll, matchAny, inRange } from '../utils/utils';
import HttpErrors from 'http-errors';

export default class TaskController {
    static fields = ['title', 'availableTime', 'photoStyle', 'minPrice', 'maxPrice'];
    static photoStyles = ['Not Specified'];

    static async createTask(req: any, res: any): Promise<void> {
        if (!this.checkPrecondition(req)) throw new HttpErrors.BadRequest();

        const task = new Task({
            title: req.body.title,
            description: req.body.description,
            Owner: req.user._id,
            availableTime: req.body.availableTime,
            photoStyle: req.body.photoStyle,
            minPrice: req.body.minPrice,
            maxPrice: req.body.maxPrice,
            createTime: new Date(),
        });

        if (!this.checkPostcondition(task)) throw new HttpErrors.InternalServerError();

        await task.save();
        res.json({ status: 'success' });
    }

    static checkPrecondition(req: any): boolean {
        if (!containAll(req.body, TaskController.fields)) return false;
        if (!inRange(req.body.title, 1, 20)) return false;
        if (!inRange(req.body.description, 0, 100)) return false;
        if (!matchAny<string>(req.body.photoStyle, TaskController.photoStyles)) return false;
        if (req.body.minPrice < 0) return false;
        if (req.body.maxPrice < 0) return false;
        if (req.body.minPrice > req.body.maxPrice) return false;

        return true;
    }

    static checkPostcondition(task: any): boolean {
        if (!(task instanceof Task)) return false;

        return true;
    }
}
