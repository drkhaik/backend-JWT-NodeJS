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
            res.cookie("jwt", response.data.access_token, { httpOnly: true, maxAge: 60 * 60 * 1000, secure: true });
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
        res.clearCookie("jwt");
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
    // console.log('Cookies: ', req.cookies);
    // console.log('Signed Cookies: ', req.signedCookies);
    // console.log("check request", req.user);
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

let fetchUser = async (req, res) => {
    try {
        let response = await userService.getUserById(req.params.id);
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

module.exports = {
    handleLogin,
    fetchAccount,
    handleLogout,
    fetchAllUser,
    fetchUser,
    createNewUser,
    updateUser,
    changeUserPassword,
    deleteUser,
    getAllRole,
}