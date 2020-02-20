import { Task } from '../models';
import { generateHash } from '../utils/userHandlers';
import HttpErrors from 'http-errors';
import validator from 'validator';

export default class TaskController {
    static fields = [];

    static async createTask(req: any, res: any): Promise<void> {
        // check precondition
        if (!this.valideInput(req)) throw new HttpErrors.BadRequest();
    }

    static async valideInput(req: any): Promise<boolean> {
        const fieldCheck = (body: any): boolean => {
            return TaskController.fields.every((field: string): boolean => {
                return body.hasOwnProperty(field);
            });
        };

        if (!fieldCheck(req.body)) return false;

        return true;
    }
}
