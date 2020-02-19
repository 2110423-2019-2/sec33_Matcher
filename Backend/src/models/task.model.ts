import mongoose, { Schema, Document } from 'mongoose';

const TaskSchema = new Schema({
    createTime: { type: Date, required: [true, 'required'] },
});

export interface ITask extends Document {
    createTime: Date;
}

export default mongoose.model<ITask>('Task', TaskSchema);
