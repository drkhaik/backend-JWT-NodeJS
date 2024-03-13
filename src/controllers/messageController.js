import messageService from '../services/messageService';

let fetchMessageHistory = async (req, res) => {
    // console.log("check conversationId", req.params.id);
    try {
        let response = await messageService.fetchMessageHistoryService(req.params.id);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: "Error from server...",
        })
    }
}

let fetchMoreMessageHistoryByLastMessageId = async (req, res) => {
    try {
        let response = await messageService.fetchMoreMessageService(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: "Error from server...",
        })
    }
}

module.exports = {
    fetchMessageHistory,
    fetchMoreMessageHistoryByLastMessageId,
}