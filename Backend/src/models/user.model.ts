import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    createdTime: Date,
});

export default mongoose.model('User', UserSchema);
