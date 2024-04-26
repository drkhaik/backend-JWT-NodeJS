import documentService from '../services/documentService';

let createDocument = async (req, res) => {
    try {
        let response = await documentService.createDocumentService(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: "Error from server...",
        })
    }
}

let fetchDocumentBySubjectId = async (req, res) => {
    try {
        let response = await documentService.fetchDocumentBySubjectIdService(req.params.id);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: "Error from server...",
        })
    }
}

// let fetchAllDocument = async (req, res) => {
//     try {
//         let response = await documentService.fetchAllDocumentService();
//         return res.status(200).json(response);
//     } catch (e) {
//         return res.status(200).json({
//             errCode: -1,
//             message: "Error from server...",
//         })
//     }
// }

// let updateDocument = async (req, res) => {
//     try {
//         let response = await documentService.updateDocumentService(req.body);
//         return res.status(200).json(response);
//     } catch (e) {
//         return res.status(200).json({
//             errCode: -1,
//             message: "Error from server...",
//         })
//     }
// }

let deleteDocument = async (req, res) => {
    try {
        let response = await documentService.deleteDocumentService(req.params.id);
        return res.status(200).json(response);
    } catch (e) {
        console.log("check e", e);
        return res.status(200).json({
            errCode: -1,
            message: "Error from server...",
        })
    }
}

let fetchAllDocumentForStat = async (req, res) => {
    try {
        let response = await documentService.fetchAllDocumentForStatService();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: "Error from server...",
        })
    }
}

let fetchDocumentMostRating = async (req, res) => {
    try {
        let response = await documentService.fetchDocumentMostRatingService();
        return res.status(200).json(response);
    } catch (e) {
        console.log("check e", e);
        return res.status(200).json({
            errCode: -1,
            message: "Error from server...",
        })
    }
}

let ratingDocument = async (req, res) => {
    try {
        let response = await documentService.ratingDocumentService(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: "Error from server...",
        })
    }
}

module.exports = {
    createDocument,
    fetchDocumentBySubjectId,
    // fetchAllDocument,
    // updateDocument,
    deleteDocument,
    fetchAllDocumentForStat,
    fetchDocumentMostRating,
    ratingDocument,
}