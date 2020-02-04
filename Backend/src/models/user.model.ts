import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {type: String, required: [true, "username cannot be blank."]},
    password: {type: String, required: [true, "password cannot be blank."]},
    name: String,
    role: String,
    createTime: {type: Date, default: Date.now}

});

export default mongoose.model('User', UserSchema);
