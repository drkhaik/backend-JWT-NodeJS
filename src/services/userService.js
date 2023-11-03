import bcrypt from 'bcryptjs';
import db from '../models';

const salt = bcrypt.genSaltSync(10);

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e)
        }
    })
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}

let handleLoginService = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            let isExist = await checkUserEmail(email)
            if (isExist) {
                // user already exist
                let user = await db.User.findOne({
                    where: { email: email },
                    attributes: ['id', 'email', 'fullName', 'password'],
                    raw: true,
                })
                if (user) {
                    // compare password
                    let checkPassword = await bcrypt.compareSync(password, user.password);
                    if (checkPassword) {
                        userData.errCode = 0;
                        userData.message = "Ok";
                        // userData.jwtKey = createJWT(); // then save in redux, verify
                        // userData.accessToken = generateAccessToken(user)
                        // userData.refreshToken = generateRefreshToken(user)
                        // delete password ko day ra phia client
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        // userData.message = "Wrong password!";
                        userData.message = "Sth went wrong";
                    }
                } else {
                    userData.errCode = 2;
                    // userData.message = "User not found";
                    userData.message = "Sth went wrong";
                }
            } else {
                // return error
                userData.errCode = 1;
                userData.message = "Your Email isn't exist in your system. Plz try the other one!";
            }
            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}

let createUserService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            let user = await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                fullName: data.fullName,
                // address: data.address,
                // phoneNumber: data.phoneNumber,
                // gender: data.gender,
                // image: null,
                // roleId: data.role,
                // positionId: null,
                createdAt: new Date(),
                updatedAt: new Date()
            })
            // let allUsers = getAllUser();

            resolve({
                errCode: 0,
                message: "OK",
            })
        } catch (e) {
            reject(e);
        }
    })
}

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                // raw: true,
            });
            resolve(users)
        } catch (e) {
            reject(e)
        }
    })
}

let getUsers = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findOne({
                // raw: true,
            });
            // users.get({ plain: true });
            resolve(users)
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    handleLoginService: handleLoginService,
    hashUserPassword: hashUserPassword,
    createUserService: createUserService,
    getAllUser: getAllUser,
    getUsers: getUsers,
}