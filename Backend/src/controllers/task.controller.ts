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

    private static checkDeleteTask(req: any): boolean {
        //input must be valid
        
        //task must exist
        if(!Task.exists({_id: req.task._id})){
            console.log('Requested task does not exists');
            return false;
        }
        
        //user must have permission to delete task
        //case 1: is admin
        if(req.user.role == 'admin'){
            return true;
        }//case 2: is user and the owner of the task
        else if(req.user.role == 'user'){
            if(Task.findById(req.task._id) == null){
                return false;
            }
        }
        else{
            return false;
        }

        return true;
    }

    static async deleteTask(req: any, res: any): Promise<void> {
        //precondition
        if(!TaskController.checkDeleteTask(req)) throw new HttpErrors.BadRequest();
        await Task.findOneAndDelete({_id:req.task._id});
        res.json({ status: 'success' });
    }

    
}