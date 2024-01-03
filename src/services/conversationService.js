import Conversation from "../models/Conversation";
import User from "../models/User";

let createConversationService = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { senderId, recipientId } = data;
            let conversation = await Conversation.findOne({
                participants: {
                    $all: [senderId, recipientId]
                }
            });
            if (!conversation) {
                conversation = new Conversation({
                    participants: [senderId, recipientId],
                    conversationId: `${senderId}-${recipientId}`
                });
            } else {
                conversation.isNew = false;
            }
            await conversation.save();
            resolve({
                errCode: 0,
                message: "OK",
                data: conversation.conversationId,
            })
        } catch (e) {
            reject(e)
        }
    })
}

let fetchConversationByUserIdService = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const conversations = await Conversation.find({
                participants: { $in: [userId] }
            }).select({
                __v: false,
                _id: false,
                isNewConversation: false,
                createdAt: false,
            }).sort({
                updatedAt: -1
            });

            const users = [];
            for (let i = 0; i < conversations.length; i++) {
                let item = conversations[i].participants.filter(element => element.toHexString() !== userId);
                let user = await User.find({ _id: item[0] }, { _id: true, name: true, email: true, image: true });
                let newUser = {
                    ...user[0]._doc,
                    conversationId: conversations[i].conversationId
                };
                users.push(newUser);
            }
            // console.log("check arrConversationId", arrConversationId);
            // const users = await User.find({
            //     _id: { $in: arrRecipientId, },
            // }, { _id: true, name: true, email: true, image: true });
            resolve({
                errCode: 0,
                message: "OK",
                data: users,
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createConversationService: createConversationService,
    fetchConversationByUserIdService: fetchConversationByUserIdService,
}