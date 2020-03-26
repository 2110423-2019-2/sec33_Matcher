import { Task, User, ITask } from '../models';
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

    private static async checkUpdateTask(req: any): Promise<boolean> {
        const id = new Types.ObjectId(req.params.taskId);
        const task = await Task.findById(id);

        if (!task) {
            return false;
        } else {
            if (req.user.role === Role.CUSTOMER) {
                if (task.owner !== req.user._id) return false;
            } else if (req.user.role !== Role.ADMIN) {
                return false;
            }
        }

        if (!containAll(req.body, TaskController.requiredFields)) return false;
        if (!inRange(req.body.title.length, 1, 20)) return false;
        if (!photoStyles.includes(req.body.photoStyle)) return false;
        if (req.body.price < 0) return false;

        return true;
    }

    static async updateTask(req: any, res: any): Promise<void> {
        if (!(await TaskController.checkUpdateTask(req))) throw new HttpErrors.BadRequest();

        const fields = TaskController.requiredFields.concat(TaskController.optionalFields);
        const newFields = pick(req.body, fields);

        await Task.findOneAndUpdate({ _id: new Types.ObjectId(req.params.taskId) }, newFields);
        res.json({ status: 'success' });
    }

    static async getMatchedTasks(req: any, res: any): Promise<any> {
        const user = await User.findOne({ _id: req.user._id });
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
        const user = await User.findById(req.user._id);
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
        res.json(finishedTasks);
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
  
    static async acceptTask(req: any, res: any): Promise<void> {
        try {
            const user = await User.findById(req.user._id);
            if (user.role === Role.CUSTOMER) {
                throw new HttpErrors.Unauthorized();
            } else {
                // admin and photographer can accept task.
                const task = await Task.findById(req.params.id);
                if (!task) throw new HttpErrors.NotFound();
                if (task.status !== TaskStatus.AVAILABLE) throw new HttpErrors.NotFound();

                const acceptedTask = { ...task, acceptedBy: req.user._id, status: TaskStatus.ACCEPTED };
                task.set(acceptedTask);
                res.json(await task.save());
            }
        } catch (err) {
            console.log(err);
            throw new HttpErrors.BadRequest();
        }
    }
  
    static async finishTask(req: any, res: any): Promise<void> {
        try {
            const user = await User.findById(req.user._id);
            const task = await Task.findById(req.params.id);
            if (!task) throw new HttpErrors.NotFound();
            if (user.role === Role.CUSTOMER) {
                // customer will set status to finished
                if (!req.user._id.equals(task.owner)) throw new HttpErrors.Unauthorized();
                if (task.status !== TaskStatus.REQ_FIN) throw new HttpErrors.BadRequest();
                task.status = TaskStatus.FINISHED;

                await task.save();
                res.json({ status: 'success' });
            } else if (user.role === Role.PHOTOGRAPHER) {
                if (!req.user._id.equals(task.acceptedBy)) throw new HttpErrors.Unauthorized();
                if (task.status === TaskStatus.ACCEPTED) throw new HttpErrors.BadRequest();
                task.status = TaskStatus.REQ_FIN;

                await task.save();
                res.json({ status: 'success' });
            } else if (user.role === Role.ADMIN) {
                // TODO implement finish task for admin here
            } else {
                throw new HttpErrors.Unauthorized();
            }
        } catch (err) {
            console.log(err);
            throw new HttpErrors.BadRequest();
        }
    }
}
