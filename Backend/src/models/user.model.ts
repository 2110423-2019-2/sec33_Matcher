import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    email: {type: String, required: [true, 'email cannot be blank']},
    password: { type: String, required: [true, 'password cannot be blank.'] },
    firstname: String,
    lastname: String,
    role: String,
    createTime: Date,
});

export default mongoose.model('User', UserSchema);
