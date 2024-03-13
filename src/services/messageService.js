import Message from "../models/Message";

const limitNumberOfMessage = 20;
let fetchMessageHistoryService = (conversationId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const messageList = await Message.find({
                conversation: conversationId
            }).sort({
                createdAt: -1
            }).limit(limitNumberOfMessage)
                .select({
                    updatedAt: 0,
                    __v: 0,
                    __t: 0,
                    public_id: 0,
                })
            // messageList.reverse();
            // console.log("check message list initial", messageList);
            // return;
            resolve({
                errCode: 0,
                message: "OK",
                data: messageList
            })
        } catch (e) {
            reject(e)
        }
    })
}

let fetchMoreMessageService = ({ conversationId, lastMessageId }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const messageList = await Message.find({
                conversation: conversationId,
                _id: { $lt: lastMessageId }
            }).sort({
                createdAt: -1
            }).limit(limitNumberOfMessage)
                .select({
                    __v: false,
                    // _id: false,
                    // createdAt: false,
                    updatedAt: false,
                });
            // console.log("check message list", messageList);
            // return;
            resolve({
                errCode: 0,
                message: "OK",
                data: messageList
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    fetchMessageHistoryService: fetchMessageHistoryService,
    fetchMoreMessageService: fetchMoreMessageService,
}