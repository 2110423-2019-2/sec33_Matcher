import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {type: String, required: [true, "can not be blank."]},
    password: String,
    name: String,
    createdTime: Date,
});

export default mongoose.model('User', UserSchema);
