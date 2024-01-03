import conversationServices from '../services/conversationService';

let createConversation = async (req, res) => {
    try {
        let response = await conversationServices.createConversationService(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: "Error from server...",
        })
    }
}

let fetchConversationByUserId = async (req, res) => {
    try {
        let response = await conversationServices.fetchConversationByUserIdService(req.params.id);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: "Error from server...",
        })
    }
}

module.exports = {
    createConversation,
    fetchConversationByUserId,
}