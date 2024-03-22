import userService from '../services/userService';

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing input parameters!'
        })
    }
    try {
        let response = await userService.handleLoginService(email, password)
        if (response?.data?.access_token) {
            res.cookie("jwt", response.data.access_token,
                { httpOnly: true, maxAge: 60 * 60 * 1000, secure: true, sameSite: 'none' });
        }
        // console.log("check response", response);
        return res.status(200).json(response);
    } catch (e) {
        // console.log("check e", e);
        return res.status(200).json({
            errCode: -1,
            // message: res.message,
        })
    }
}

let handleGoogleLogin = async (req, res) => {
    let user = req.user;
    let type = req.body.type;
    console.log("check user controller", user);
    if (!user) {
        return res.status(200).json({
            errCode: 1,
            message: 'Missing input parameters!'
        })
    }
    try {
        let response = await userService.handleLoginGoogleService(user._id, type)
        if (response?.data?.access_token) {
            res.cookie("jwt", response.data.access_token,
                // { httpOnly: true, maxAge: 60 * 60 * 1000, secure: true });
                { withCredentials: true, path: "/", httpOnly: true, maxAge: 60 * 60 * 1000, secure: true, sameSite: 'none' });
        }
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
        })
    }
}

let fetchAccount = async (req, res) => {
    try {
        let id = req?.tokenDecoded?.user ? req.tokenDecoded.user._id : null;
        if (id === null) return;
        let response = await userService.fetchAccountService(id);
        return res.status(200).json({
            errCode: 0,
            message: "Ok",
            data: {
                user: response,
                token: req.token,
            }
        });
    } catch (e) {
        console.log("check err", e);
        return res.status(500).json({
            errCode: -1,
            message: "Error from server...",
        })
    }
}

let handleLogout = async (req, res) => {
    try {
        res.clearCookie("jwt", { httpOnly: true, secure: true });
        res.clearCookie("express:sess", { httpOnly: true, secure: true });
        res.clearCookie("express:sess.sig", { httpOnly: true, secure: true });
        return res.status(200).json({
            errCode: 0,
            message: "Ok",
        });
    } catch (e) {
        return res.status(500).json({
            errCode: -1,
            message: "Error from server...",
        })
    }
}

let fetchAllUser = async (req, res) => {
    try {
        let response = await userService.fetchAllUser();
        return res.status(200).json(response);

    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: "Error from server...",
        })
    }
}

let fetchDataUserForStat = async (req, res) => {
    try {
        let response = await userService.fetchDataUserForStatService();
        return res.status(200).json(response);

    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: "Error from server...",
        })
    }
}

let fetchUser = async (req, res) => {
    try {
        let response = await userService.fetchUserById(req.params.id);
        return res.status(200).json(response);

    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: "Error from server...",
        })
    }
}

let createNewUser = async (req, res) => {
    try {
        let response = await userService.createUserService(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: "Error from server...",
        })
    }
}

let updateUser = async (req, res) => {
    try {
        let response = await userService.updateUserService(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: "Error from server...",
        })
    }
}

let changeUserPassword = async (req, res) => {
    try {
        let response = await userService.changeUserPasswordService(req.body);
        return res.status(200).json(response);
    } catch (e) {
        // console.log("check error", e);
        return res.status(200).json({
            errCode: -1,
            message: "Error from server...",
        })
    }
}

let changeFaculty = async (req, res) => {
    try {
        let response = await userService.changeUserFacultyService(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: "Error from server...",
        })
    }
}

let changeDepartmentFaculty = async (req, res) => {
    try {
        let response = await userService.changeDepartmentFacultyService(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: "Error from server...",
        })
    }
}

let deleteUser = async (req, res) => {
    try {
        // console.log("check req.params", req.params);
        let response = await userService.deleteUserService(req.params.id);
        return res.status(200).json(response);
    } catch (e) {
        // console.log("check error", e);
        return res.status(200).json({
            errCode: -1,
            message: "Error from server...",
        })
    }
}

let getAllRole = async (req, res) => {
    try {
        let response = await userService.getAllRoleService();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: "Error from server...",
        })
    }
}

let fetchDepartmentUser = async (req, res) => {
    try {
        let response = await userService.fetchDepartmentUserService(req.params.id);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: "Error from server...",
        })
    }
}

module.exports = {
    handleLogin,
    handleGoogleLogin,
    fetchAccount,
    handleLogout,
    fetchAllUser,
    fetchDataUserForStat,
    fetchUser,
    createNewUser,
    updateUser,
    changeUserPassword,
    changeFaculty,
    changeDepartmentFaculty,
    deleteUser,
    getAllRole,
    fetchDepartmentUser,
}