require('dotenv').config();
import jwt from "jsonwebtoken";

const nonSecurePaths = ['/',
    '/logout',
    '/login',
    '/auth/google',
    '/auth/google/callback',
    '/auth/student',
    '/auth/department'
];

const createTokenJWT = (payload) => {
    // let payload = { name: 'drkhaik', address: 'ha noi' };
    let key = process.env.JWT_SECRET;
    let expiresIn = { expiresIn: process.env.JWT_EXPIRES_IN };
    let token = null;
    try {
        token = jwt.sign(payload, key, expiresIn);
    }
    catch (err) {
        console.log(err);
    }
    // console.log(token);
    return token;
}

const verifyToken = (token) => {
    let key = process.env.JWT_SECRET;
    let decoded = null;
    try {
        decoded = jwt.verify(token, key);
    } catch (err) {
        console.log(err);
    }
    return decoded;
    // jwt.verify(token, key, function (err, decoded) {
    //     if (err) {
    //         console.log(err);
    //         return data;
    //     }
    //     console.log(decoded);
    //     return decoded;
    // })
}

const checkTokenJWT = (req, res, next) => {
    // console.log("check path", req.path);
    if (nonSecurePaths.includes(req.path)) return next();
    let cookies = req.cookies;
    if (cookies && cookies.jwt) {
        let token = cookies.jwt;
        let decoded = verifyToken(token);
        if (decoded) {
            // console.log(decoded);
            req.tokenDecoded = decoded;
            req.token = token;
            return next();
        }
    }
    return res.status(401).json({
        errCode: -1,
        message: "Unauthorized!",
    })
}

const checkAdminPermission = (req, res, next) => {
    // console.log("check req.tokenDecoded", req.tokenDecoded);
    if (nonSecurePaths.includes(req.path)) return next();
    if (req.tokenDecoded) {
        // console.log("check user", req.tokenDecoded.user);
        let role = req.tokenDecoded.user.role;
        if (role && role === 'Admin') {
            return next();
        }
    }
    return res.status(403).json({
        errCode: -1,
        message: "Permission denied!",
    })
}

module.exports = {
    createTokenJWT,
    verifyToken,
    checkTokenJWT,
    checkAdminPermission,
}