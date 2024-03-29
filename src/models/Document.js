const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const documentSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    fileName: {
        type: String,
        require: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    subject: {
        type: Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    },
    fileUrl: {
        type: String,
        require: true,
    },
    public_id: {
        type: String,
        require: true,
    },
    fileType: {
        type: String
    },
    fileSize: {
        type: Number
    }
}, { timestamps: true });

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;