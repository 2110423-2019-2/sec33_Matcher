import { Task } from '../models';
import { containAll, inRange } from '../utils/utils';
import { Role, photoStyles, TaskStatus } from '../const';
import HttpErrors from 'http-errors';
import { Types } from 'mongoose';
import pick from 'object.pick';

export default class TaskController {
    private static requiredFields: Array<string> = ['title', 'location', 'availableTime', 'photoStyle', 'price'];
    private static optionalFields: Array<string> = ['description', 'image'];
    private static availableOwnerRoles: Array<string> = [Role.CUSTOMER, Role.ADMIN];

    private static checkCreateTask(req: any): boolean {
        if (!containAll(req.body, TaskController.requiredFields)) return false;
        if (!inRange(req.body.title.length, 1, 20)) return false;
        if (!TaskController.availableOwnerRoles.includes(req.user.role)) return false;
        if (!photoStyles.includes(req.body.photoStyle)) return false;
        if (req.body.price < 0) return false;

        return true;
    }

    static async createTask(req: any, res: any): Promise<void> {
        if (!TaskController.checkCreateTask(req)) throw new HttpErrors.BadRequest();

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
            status: TaskStatus.AVAILABLE,
        });

        await task.save();
        res.json({ status: 'success' });
    }

    private static checkUpdateTask(req: any): boolean {
        if (!containAll(req.body, TaskController.requiredFields)) return false;
        if (!inRange(req.body.title.length, 1, 20)) return false;
        if (!photoStyles.includes(req.body.photoStyle)) return false;
        if (req.body.price < 0) return false;

        return true;
    }
    static async updateTask(req: any, res: any): Promise<void> {
        if (!TaskController.checkUpdateTask(req)) throw new HttpErrors.BadRequest();
        
        const fields = TaskController.requiredFields.concat(TaskController.optionalFields);
        const newFields = pick(req.body, fields);

        await Task.findOneAndUpdate({ _id: new Types.ObjectId(req.params.taskId), owner: req.user._id, status:TaskStatus.AVAILABLE }, newFields);
    }
}
