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
    }
}, { timestamps: true });

const textMessageSchema = new Schema({
    type: {
        type: String,
        default: 'text'
    },
    body: {
        type: String,
        required: true
    },
});

const fileMessageSchema = new Schema({
    // Các trường riêng cho tin nhắn file
    type: {
        type: String,
        default: 'file'
    },
    body: {
        type: String,
        required: true
    },
    fileUrl: {
        type: String,
        required: true
    },
    public_id: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    fileType: {
        type: String,
        required: true
    },
    fileSize: {
        type: Number,
        required: true
    }
});

const Message = mongoose.model('Message', messageSchema);

const TextMessage = Message.discriminator('TextMessage', textMessageSchema);
const FileMessage = Message.discriminator('FileMessage', fileMessageSchema);

module.exports = { Message, TextMessage, FileMessage };