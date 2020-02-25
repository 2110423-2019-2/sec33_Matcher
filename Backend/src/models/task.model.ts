import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from '../models';

const TaskSchema = new Schema({
    title: { type: String, required: [true, 'title can not be blank'] },
    description: { type: String },
    location: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'owner is required'] },
    availableTime: { type: Date, required: [true, 'available time is required'] },
    photoStyle: { type: String, required: [true, 'photo style is required'] },
    price: { type: Number, required: [true, 'the minimum price is required'] },
    image: { type: String },
    createTime: { type: Date, required: [true, 'the created time is required'] },
});

export interface ITask extends Document {
    tile: string;
    description: string;
    location: string;
    owner: IUser['_id'];
    availableTime: Date;
    photoStyle: string;
    price: number;
    image: string;
    createTime: Date;
}

export default mongoose.model<ITask>('Task', TaskSchema);
