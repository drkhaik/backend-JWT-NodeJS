import Message from "../models/Message";

let fetchMessageHistoryService = (conversationId) => {
    // console.log("check conversationId", conversationId);
    return new Promise(async (resolve, reject) => {
        try {
            const messageList = await Message.find({
                conversation: conversationId
            })
                .select({
                    __v: false,
                    _id: false,
                    createdAt: false,
                    updatedAt: false,
                });

            // console.log("check messageList", messageList);
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
}