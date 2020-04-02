import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from '../models';

const TaskSchema = new Schema({
    title: { type: String, required: [true, 'title can not be blank'] },
    location: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'owner is required'] },
    photoStyle: { type: String, required: [true, 'photo style is required'] },
    price: { type: Number, required: [true, 'the minimum price is required'] },
    image: { type: String },
    createTime: { type: Date, required: [true, 'the created time is required'] },
    status: { type: String, required: [true] },
    acceptedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    ratingScore: { type: Number, min: 0, max: 5 },
    comment: { type: String },
});

export interface ITask extends Document {
    title: string;
    location: string;
    owner: IUser['_id'];
    photoStyle: string;
    price: number;
    image: string;
    createTime: Date;
    status: string;
    acceptedBy: IUser['_id'];
    ratingScore: number;
    comment: string;
}

export default mongoose.model<ITask>('Task', TaskSchema);
