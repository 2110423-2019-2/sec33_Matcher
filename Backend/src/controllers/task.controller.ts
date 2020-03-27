import { Task } from '../models';
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

    private static async checkDeleteTask(req: any): Promise<boolean> {
        const id = req.body.taskId;
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
            }
            return true;
        }
    }

    static async deleteTask(req: any, res: any): Promise<void> {
        //precondition
        if (!(await TaskController.checkDeleteTask(req))) throw new HttpErrors.BadRequest();
        await Task.findOneAndDelete({ _id: req.body.taskId }, (err, res) => {
            if (err) throw new HttpErrors.BadRequest();
        });
        res.json({ status: 'success' });
    }
}
