import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from '../models';

const ReportSchema = new Schema({
    reporter: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'reporter is required'] },
    reportee: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'reportee is required'] },
    reason: { type: String, reqired: [true, 'report reason required'] },
    createTime: { type: Date, required: [true, 'the created time is required'] },
});

export interface IReport extends Document {
    reporter: IUser['_id'];
    reportee: IUser['_id'];
    reason: string;
    createTime: Date;
}

export default mongoose.model<IReport>('Report', ReportSchema);
