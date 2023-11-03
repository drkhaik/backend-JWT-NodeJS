import userService from '../services/userService';

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing input parameters!'
        })
    }
    let userData = await userService.handleLoginService(email, password)
    // console.log(userData)
    return res.status(200).json(userData);
}

let getUsers = async (req, res) => {
    let users = await userService.getAllUser();
    return res.status(200).json({
        errCode: 0,
        message: 'OKela',
        // users
    })
}

let getUser = async (req, res) => {
    let data = await userService.getUsers(req.query.id);
    return res.status(200).json({
        errCode: 0,
        message: 'OK',
        users
    })
}

let createNewUser = async (req, res) => {
    let response = await userService.createUserService(req.body);
    // console.log(response);
    return res.status(200).json(response);
}


module.exports = {
    handleLogin,
    getUsers,
    getUser,
    createNewUser,

}