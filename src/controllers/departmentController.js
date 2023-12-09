import departmentService from '../services/departmentService';

let createDepartment = async (req, res) => {
    try {
        let response = await departmentService.createDepartmentService(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: "Error from server...",
        })
    }
}

let getAllDepartment = async (req, res) => {
    try {
        let response = await departmentService.getAllDepartment();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: "Error from server...",
        })
    }
}

let updateDepartmentInfo = async (req, res) => {
    try {
        let response = await departmentService.updateDepartmentInfoService(req.body);
        return res.status(200).json(response);
    } catch (e) {
        // console.log("check error", e);
        return res.status(200).json({
            errCode: -1,
            message: "Error from server...",
        })
    }
}

let changeDepartmentPassword = async (req, res) => {
    try {
        let response = await departmentService.changeDepartmentPasswordService(req.body);
        return res.status(200).json(response);
    } catch (e) {
        // console.log("check error", e);
        return res.status(200).json({
            errCode: -1,
            message: "Error from server...",
        })
    }
}

let deleteDepartment = async (req, res) => {
    try {
        // console.log("check req.params", req.params);
        let response = await departmentService.deleteDepartmentService(req.params.id);
        return res.status(200).json(response);
    } catch (e) {
        // console.log("check error", e);
        return res.status(200).json({
            errCode: -1,
            message: "Error from server...",
        })
    }
}

module.exports = {
    createDepartment,
    getAllDepartment,
    updateDepartmentInfo,
    changeDepartmentPassword,
    deleteDepartment,
}