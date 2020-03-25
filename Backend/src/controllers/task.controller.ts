import { Task, User } from '../models';
import { containAll, inRange } from '../utils/utils';
import { Role, photoStyles, TaskStatus } from '../const';
import HttpErrors from 'http-errors';

export default class TaskController {
    private static requiredFields: Array<string> = ['title', 'location', 'availableTime', 'photoStyle', 'price'];
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

    static async getMatchedTasks(req: any, res: any): Promise<any> {
        const user = await User.findOne({ _id: req.user._id })
        if (user.role === Role.CUSTOMER) {
            const matchedTasks = await Task.find({ owner: req.user._id, status: TaskStatus.ACCEPTED });
            res.json(matchedTasks);
        } else if (user.role === Role.PHOTOGRAPHER) {
            const matchedTasks = await Task.find({ acceptedBy: req.user._id, status: TaskStatus.ACCEPTED });
            res.json(matchedTasks);
        } else {
            // TODO add getMatchedTasks for admin
            throw new HttpErrors.NotImplemented();
        }
    }

    static async getAvailableTasks(req: any, res: any): Promise<any> {
        try {
            const user = await User.findOne({ __id: req.user._id });
            if (user.role === Role.CUSTOMER) {
                const tasks = await Task.find({ status: TaskStatus.AVAILABLE, owner: req.user._id });
                res.json(tasks);
            } else {
                const tasks = await Task.find({ status: TaskStatus.AVAILABLE });
                res.json(tasks);
            }
        } catch (err) {
            console.log(err);
            throw new HttpErrors.BadRequest();
        }
    }
  
    static async rateTask(req: any, res: any): Promise<void> {
        const task = await Task.findById(req.body.taskId);
        if (!task) throw new HttpErrors.NotFound();
        if (!req.user._id.equals(task.owner)) throw new HttpErrors.Unauthorized();
        if (task.status !== TaskStatus.FINISHED) throw new HttpErrors.BadRequest('Task unfinished');
        task.ratingScore = req.body.rating;
        task.comment = req.body.comment;

        await task.save();
        res.json({ status: 'success' });
    }
}
