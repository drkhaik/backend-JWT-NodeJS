const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    conversation: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

// const messageList = await Message.find({ conversation: 'somerandomconversationId' });

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;