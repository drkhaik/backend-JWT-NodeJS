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
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: "Incorrect email or password!",
        })
    }
}

let fetchAccount = async (req, res) => {
    try {
        let id = req?.tokenDecoded?.user ? req.tokenDecoded.user.id : null;
        if (id === null) return;
        let response = await userService.fetchAccountService(id)
        // console.log("check req", req);
        return res.status(200).json({
            errCode: 0,
            message: "Ok",
            data: {
                user: response,
                token: req.token,
            }
        });
    } catch (e) {
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
        let response = await userService.getUserById(req.query.id);
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
    getAllRole,
}