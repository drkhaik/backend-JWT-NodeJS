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
        required: true
    },
    email_verified: {
        type: Number,
    }
}, { timestamps: true });

const departmentSchema = new Schema({
    type: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
});

const studentSchema = new Schema({
    student_id: {
        type: String,
        required: true,
    },
    faculty: {
        type: String,
        ref: 'Department',
        required: true,
    }
});

const User = mongoose.model('User', userSchema);
const Department = User.discriminator('Department', departmentSchema);
const Student = User.discriminator('Student', studentSchema);

module.exports = {
    User,
    Department,
    Student,
};