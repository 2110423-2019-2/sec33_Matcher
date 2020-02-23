import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from '../models';

const TaskSchema = new Schema({
    title: { type: String, required: [true, 'title can not be blank'] },
    description: { type: String },
    Owner: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'owner is required'] },
    avaibleTime: { type: Date, required: [true, 'available time is required'] },
    photoStyle: { type: String, required: [true, 'photo style is required'] },
    minPrice: { type: Number, required: [true, 'the minimum price is required'] },
    maxPrice: { type: Number, required: [true, 'the maximum price is requried'] },
    createTime: { type: Date, required: [true, 'the created time is required'] },
});

export interface ITask extends Document {
    tile: string;
    description: string;
    owner: IUser['_id'];
    availableTime: Date;
    photoStyle: string;
    minPrice: number;
    maxPrice: number;
    createTime: Date;
}

export default mongoose.model<ITask>('Task', TaskSchema);
