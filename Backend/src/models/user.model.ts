import mongoose, { Schema, Document } from 'mongoose';

const UserSchema = new Schema({
    email: { type: String, required: [true, 'email cannot be blank'], unique: true },
    password: { type: String, required: [true, 'password cannot be blank.'] },
    firstname: { type: String, required: [true, 'required'] },
    lastname: { type: String, required: [true, 'required'] },
    role: { type: String, required: [true, 'required'] },
    createTime: { type: Date, required: [true, 'required'] },
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
