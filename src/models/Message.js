const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    conversation: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    fileUrl: {
        type: String
    },
    public_id: {
        type: String
    },
    fileName: {
        type: String
    },
    fileType: {
        type: String
    },
    fileSize: {
        type: Number
    }
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;