import { Task, User, ITask } from '../models';
import { containAll, inRange } from '../utils/utils';
import { Role, photoStyles, TaskStatus } from '../const';
import UserController from './user.controller';
import HttpErrors from 'http-errors';
import { Types } from 'mongoose';
import pick from 'object.pick';

export default class TaskController {
    private static requiredFields: Array<string> = ['title', 'location', 'photoStyle', 'price'];
    private static optionalFields: Array<string> = ['image'];
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
        console.log(req.body);
        if (!TaskController.checkCreateTask(req)) throw new HttpErrors.BadRequest();
        const task = new Task({
            title: req.body.title,
            location: req.body.location,
            owner: req.user._id,
            photoStyle: req.body.photoStyle,
            price: req.body.price,
            image: req.body.image,
            createTime: new Date(),
            status: TaskStatus.AVAILABLE,
        });

        await task.save();
        res.json({ status: 'success' });
    }

    private static async checkDeleteTask(req: any): Promise<boolean> {
        const id = new Types.ObjectId(req.params.taskId);
        const task = await Task.findById(id);
        if (!task) {
            return false;
        } else if (req.user.role === Role.ADMIN) {
            return true;
        } else if (req.user.role !== Role.CUSTOMER) {
            return false;
        } else {
            if (task.owner.toString() !== req.user._id.toString()) {
                return false;
            } else if (task.status !== TaskStatus.AVAILABLE) {
                return false;
            }
            return true;
        }
    }

    static async deleteTask(req: any, res: any): Promise<void> {
        //precondition
        if (!(await TaskController.checkDeleteTask(req))) throw new HttpErrors.BadRequest();
        await Task.findOneAndDelete({ _id: Types.ObjectId(req.params.taskId) });
        res.json({ status: 'success' });
    }

    private static async checkUpdateTask(req: any): Promise<boolean> {
        const task = await Task.findById(req.params.taskId);

        if (!task) {
            return false;
        } else {
            if (req.user.role === Role.CUSTOMER) {
                if (!task.owner.equals(req.user._id)) return false;
            } else if (req.user.role !== Role.ADMIN) {
                return false;
            }
        }

        if (!inRange(req.body.title.length, 1, 20)) return false;
        if (!inRange(req.body.location.length, 1, 20)) return false;
        const isnum = /^\d*\.?\d+$/.test(req.body.price);
        if (req.body.price < 0 || !isnum) return false;
        if (task.status !== TaskStatus.AVAILABLE) return false;
        return true;
    }

    static async updateTask(req: any, res: any): Promise<void> {
        if (!(await TaskController.checkUpdateTask(req))) throw new HttpErrors.BadRequest();

        const fields = TaskController.requiredFields.concat(TaskController.optionalFields);
        const newFields = pick(req.body, fields);

        await Task.findOneAndUpdate({ _id: new Types.ObjectId(req.params.taskId) }, newFields);
        res.json({ status: 'success' });
    }

    static async getAvailableTasks(req: any, res: any): Promise<any> {
        try {
            const user = await User.findById(req.user._id);
            if (user.role === Role.CUSTOMER) {
                const tasks = await Task.find({ status: TaskStatus.AVAILABLE, owner: req.user._id }).populate('owner');
                res.json(tasks);
            } else if (user.role === Role.PHOTOGRAPHER || user.role === Role.ADMIN) {
                const tasks = await Task.find({ status: TaskStatus.AVAILABLE }).populate('owner');
                res.json(tasks);
            } else {
                throw new HttpErrors.NotImplemented();
            }
        } catch (err) {
            console.log(err);
            throw new HttpErrors.BadRequest();
        }
    }

    static async getPendingTasks(req: any, res: any): Promise<any> {
        try {
            const user = await User.findById(req.user._id);
            if (user.role === Role.CUSTOMER) {
                const task = await Task.find({ owner: req.user._id, status: TaskStatus.PENDING }).populate('owner');
                res.json(task);
            } else if (user.role === Role.PHOTOGRAPHER) {
                const task = await Task.find({ acceptedBy: req.user._id, status: TaskStatus.PENDING }).populate(
                    'owner',
                );
                res.json(task);
            } else if (user.role === Role.ADMIN) {
                const tasks = await Task.find({ status: TaskStatus.PENDING }).populate('owner');
                res.json(tasks);
            } else {
                throw new HttpErrors.NotImplemented();
            }
        } catch (err) {
            console.log(err);
            throw new HttpErrors.BadRequest();
        }
    }

    static async getMatchedTasks(req: any, res: any): Promise<any> {
        try {
            const user = await User.findById(req.user._id);
            if (user.role === Role.CUSTOMER) {
                const matchedTasks = await Task.find({ owner: req.user._id, status: TaskStatus.ACCEPTED }).populate(
                    'owner',
                );
                res.json(matchedTasks);
            } else if (user.role === Role.PHOTOGRAPHER) {
                const matchedTasks = await Task.find({
                    acceptedBy: req.user._id,
                    status: TaskStatus.ACCEPTED,
                }).populate('owner');
                res.json(matchedTasks);
            } else if (user.role === Role.ADMIN) {
                const matchedTasks = await Task.find({ status: TaskStatus.ACCEPTED }).populate('owner');
                res.json(matchedTasks);
            } else {
                // TODO add getMatchedTasks for admin
                throw new HttpErrors.NotImplemented();
            }
        } catch (err) {
            console.log(err);
            throw new HttpErrors.BadRequest();
        }
    }

    static async getReqFinTasks(req: any, res: any): Promise<any> {
        try {
            const user = await User.findById(req.user._id);
            if (user.role === Role.CUSTOMER) {
                const task = await Task.find({ owner: req.user._id, status: TaskStatus.REQ_FIN }).populate('owner');
                res.json(task);
            } else if (user.role === Role.PHOTOGRAPHER) {
                const task = await Task.find({ acceptedBy: req.user._id, status: TaskStatus.REQ_FIN }).populate(
                    'owner',
                );
                res.json(task);
            } else if (user.role === Role.ADMIN) {
                const tasks = await Task.find({ status: TaskStatus.REQ_FIN }).populate('owner');
                res.json(tasks);
            } else {
                throw new HttpErrors.NotImplemented();
            }
        } catch (err) {
            console.log(err);
            throw new HttpErrors.BadRequest();
        }
    }

    static async getFinishedTasks(req: any, res: any): Promise<any> {
        try {
            const user = await User.findById(req.user._id);
            let finishedTasks: Array<ITask>;
            if (user.role === Role.CUSTOMER) {
                finishedTasks = await Task.find({ owner: req.user._id, status: TaskStatus.FINISHED }).populate('owner');
            } else if (user.role === Role.PHOTOGRAPHER) {
                finishedTasks = await Task.find({ acceptedBy: req.user._id, status: TaskStatus.FINISHED }).populate(
                    'owner',
                );
            } else if (user.role === Role.ADMIN) {
                finishedTasks = await Task.find({ status: TaskStatus.FINISHED }).populate('owner');
            } else {
                throw new HttpErrors.Unauthorized();
            }
            res.json(finishedTasks);
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

    static async acceptTask(req: any, res: any): Promise<any> {
        const user = await User.findById(req.user._id);
        if (user.role === Role.CUSTOMER) {
            const task = await Task.findById(req.params.id);
            task.status = TaskStatus.ACCEPTED;
            UserController.notifyUserByEmail(task, TaskStatus.ACCEPTED);
            await task.save();
            res.json({ status: 'success' });
        } else if (user.role === Role.PHOTOGRAPHER) {
            const task = await Task.findById(req.params.id);
            task.status = TaskStatus.PENDING;
            task.acceptedBy = req.user._id;
            UserController.notifyUserByEmail(task, 'Requesting Accept');
            await task.save();
            res.json({ status: 'success' });
        } else {
            throw new HttpErrors.NotImplemented();
        }
    }

    static async finishTask(req: any, res: any): Promise<any> {
        const user = await User.findById(req.user._id);
        if (user.role === Role.CUSTOMER) {
            const task = await Task.findById(req.params.id);
            task.status = TaskStatus.FINISHED;
            UserController.notifyUserByEmail(task, TaskStatus.FINISHED);

            await task.save();
            res.json({ status: 'success' });
        } else if (user.role === Role.PHOTOGRAPHER) {
            const task = await Task.findById(req.params.id);
            task.status = TaskStatus.REQ_FIN;
            UserController.notifyUserByEmail(task, 'Requesting Finish');
            await task.save();
            res.json({ status: 'success' });
        } else {
            throw new HttpErrors.NotImplemented();
        }
    }

    static async getTaskById(req: any, res: any): Promise<any> {
        try {
            const task = await Task.findById(req.params.id);
            res.json(task);
        } catch (err) {
            console.log(err);
            throw new HttpErrors.BadRequest();
        }
    }

    static async cancelTask(req: any, res: any): Promise<void> {
        try {
            const user = await User.findById(req.user._id);
            const task = await Task.findById(req.params.id);
            if (!task) {
                throw new HttpErrors.NotFound();
            }
            if (task.status !== TaskStatus.PENDING) {
                throw new HttpErrors.BadRequest();
            } // can only cancel task when in pending state
            if (user.role === Role.CUSTOMER) {
                if (!user._id.equals(task.owner)) {
                    throw new HttpErrors.Unauthorized();
                }
                task.status = TaskStatus.AVAILABLE;
                await UserController.notifyUserByEmail(task, 'Task Cancelled');
                task.acceptedBy = null;
                await task.save();
                res.json({ status: 'success' });
            } else if (user.role === Role.PHOTOGRAPHER) {
                if (!user._id.equals(task.acceptedBy)) {
                    throw new HttpErrors.Unauthorized();
                }
                task.status = TaskStatus.AVAILABLE;
                await UserController.notifyUserByEmail(task, 'Task Cancelled');
                task.acceptedBy = null;
                await task.save();
                res.json({ status: 'success' });
            } else {
                // TODO implement cancel task for admin here
                throw new HttpErrors.NotImplemented();
            }
        } catch (err) {
            console.log(err);
            throw new HttpErrors.BadRequest();
        }
    }
}
