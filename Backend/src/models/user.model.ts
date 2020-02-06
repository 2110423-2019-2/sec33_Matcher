import mongoose, { Schema, Document } from 'mongoose';

const UserSchema = new Schema({
    email: {type: String, required: [true, 'email cannot be blank']},
    password: { type: String, required: [true, 'password cannot be blank.'] },
    firstname: String,
    lastname: String,
    role: String,
    createTime: Date,
});

export interface IUser extends Document {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    role: string;
    createTime: Date;
}

export default mongoose.model<IUser>('User', UserSchema);
