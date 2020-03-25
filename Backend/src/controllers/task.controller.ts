import { Task, User, ITask } from '../models';
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
    static async getFinishedTasks(req: any, res: any): Promise<any> {
        const user = await User.findById(req.user._id)
        let finishedTasks: Array<ITask>;
        if (user.role === Role.CUSTOMER) {
            finishedTasks = await Task.find({ owner: req.user._id, status: TaskStatus.FINISHED });
        } else if (user.role === Role.PHOTOGRAPHER) {
            finishedTasks = await Task.find({ acceptedBy: req.user._id, status: TaskStatus.FINISHED });
        } else if (user.role === Role.ADMIN) {
            finishedTasks = await Task.find({ status: TaskStatus.FINISHED });
        } else {
            throw new HttpErrors.Unauthorized();
        }
        res.json(finishedTasks)
    }
}
