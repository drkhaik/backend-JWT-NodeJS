const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    }
}, { timestamps: true });

// User.find({}).populate('role', 'name');

const Role = mongoose.model('Role', roleSchema);

module.exports = Role; 