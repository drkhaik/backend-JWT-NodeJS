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
    description: {
        type: String,
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


// users
//   - {
//     id: ObjectId("...ID của học sinh..."),
//     type: "student",
//     ...
//   }
//   - {
//     id: ObjectId("...ID của giảng viên..."),
//     type: "faculty",
//     ...
//   }
//   - {
//     id: ObjectId("...ID của admin..."),
//     type: "admin",
//     ...
//   }


// {
//     "_id": ObjectId("..."),
//     "from": "user1",
//     "to": "user2",
//     "message": "Hello, how are you?",
//     "createdAt": ISODate("2023-12-24T12:34:56Z")
//   }

// {
//     "from": "user1",
//     "to": "user2",
//     "messages": [
//       {
//         "text": "Xin chào thầy",
//         "createdAt": new Date()
//       },
//       {
//         "text": "Em có thắc mắc về bài tập",
//         "createdAt": new Date()
//       }
//     ],
//     "createdAt": new Date()
//   }

// db.conversations.find({
//     "from": "user1",
//     "to": "user2"
//   })

const User = mongoose.model('User', userSchema);

module.exports = User;