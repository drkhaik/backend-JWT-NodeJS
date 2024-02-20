const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        // required: true,
    },
    googleId: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    public_id: {
        type: String,
    },
    roleID: {
        type: Schema.Types.ObjectId,
        ref: 'Role',
        // required: true
    },
    email_verified: {
        type: Number,
    },
    studentId: {
        type: String,
    },
    faculty: {
        type: Schema.Types.ObjectId,
        ref: 'Faculty',
    }
}, { timestamps: true });


const User = mongoose.model('User', userSchema);

module.exports = User;