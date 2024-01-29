import facultyService from '../services/facultyService';

let createFaculty = async (req, res) => {
    console.log("check req.body", req.body);
    try {
        let response = await facultyService.createFacultyService(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: "Error from server...",
        })
    }
}

let fetchAllFaculty = async (req, res) => {
    try {
        let response = await facultyService.fetchAllFacultyService();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: "Error from server...",
        })
    }
}

let updateFaculty = async (req, res) => {
    try {
        let response = await facultyService.updateFacultyService(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: "Error from server...",
        })
    }
}

let deleteFaculty = async (req, res) => {
    try {
        let response = await facultyService.deleteFacultyService(req.params.id);
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
    createFaculty,
    fetchAllFaculty,
    updateFaculty,
    deleteFaculty,
}