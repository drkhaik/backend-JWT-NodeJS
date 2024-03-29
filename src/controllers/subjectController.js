import subjectService from '../services/subjectService';

let createSubject = async (req, res) => {
    try {
        let response = await subjectService.createSubjectService(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: "Error from server...",
        })
    }
}

let fetchAllSubject = async (req, res) => {
    try {
        let response = await subjectService.fetchAllSubjectService();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: "Error from server...",
        })
    }
}

let updateSubject = async (req, res) => {
    try {
        let response = await subjectService.updateSubjectService(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: "Error from server...",
        })
    }
}

let deleteSubject = async (req, res) => {
    try {
        let response = await subjectService.deleteSubjectService(req.params.id);
        return res.status(200).json(response);
    } catch (e) {
        console.log("check e", e);
        return res.status(200).json({
            errCode: -1,
            message: "Error from server...",
        })
    }
}

module.exports = {
    createSubject,
    fetchAllSubject,
    updateSubject,
    deleteSubject,
}