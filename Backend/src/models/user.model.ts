import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    email: { type: String, required: [true, 'email cannot be blank'] },
    password: { type: String, required: [true, 'password cannot be blank.'] },
    firstname: { type: String, required: [true, 'required'] },
    lastname: { type: String, required: [true, 'required'] },
    role: { type: String, required: [true, 'required'] },
    createTime: { type: Date, required: [true, 'required'] },
});

export default mongoose.model('User', UserSchema);
