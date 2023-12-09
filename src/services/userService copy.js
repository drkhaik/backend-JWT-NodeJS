import bcrypt from 'bcryptjs';
import db from '../models';
import { getRole } from './JWTService';
import { createTokenJWT } from '../middleware/JWTAction';

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
            let response = {}
            let isExist = await checkUserEmail(email)
            if (isExist) {
                // user already exist
                let user = await db.User.findOne({
                    where: { email: email },
                    // attributes: ['id', 'email', 'fullName', 'password', 'roleId'],
                    attributes: { exclude: ["createdAt", "updatedAt"] },
                    raw: true,
                })
                if (user) {
                    // compare password 
                    let checkPassword = await bcrypt.compareSync(password, user.password);
                    if (checkPassword) {
                        let role = await getRole(user);
                        user.role = role.name;
                        delete user.password;

                        let payload = { user };
                        let token = createTokenJWT(payload);

                        response.errCode = 0;
                        response.message = "Ok";
                        response.data = {
                            access_token: token,
                            user,
                        };
                    } else {
                        response.errCode = 3;
                        response.message = "Wrong password!";
                    }
                } else {
                    response.errCode = 2;
                    response.message = "User not found";
                }
            } else {
                // return error
                response.errCode = 1;
                response.message = "Your Email isn't exist in your system. Plz try the other one!";
            }
            resolve(response)
        } catch (e) {
            reject(e)
        }
    })
}

let fetchAccountService = (_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: _id },
                // attributes: ['id', 'email', 'fullName', 'password', 'roleId'],
                attributes: { exclude: ["createdAt", "updatedAt"] },
                raw: true,
            });
            if (user) {
                let role = await getRole(user);
                user.role = role.name;
                delete user.password;
            }
            resolve(user);
        } catch (e) {
            reject(e)
        }
    })
}

let createUserService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                fullName: data.fullName,
                // address: data.address,
                // phoneNumber: data.phoneNumber,
                // gender: data.gender,
                // image: null,
                // role: data.role,
                // positionId: null,
                createdAt: new Date(),
                updatedAt: new Date()
            })
            resolve({
                errCode: 0,
                message: "OK",
            })
        } catch (e) {
            reject(e);
        }
    })
}

let fetchAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                // raw: true,
                attributes: { exclude: ["createdAt", "updatedAt", "password"] },
            });

            resolve({
                errCode: 0,
                message: "OK",
                data: users
            })
        } catch (e) {
            reject(e)
        }
    })
}

let getUserById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                // raw: true,
            });
            // users.get({ plain: true });
            resolve({
                errCode: 0,
                message: "OK",
                data: user
            })
        } catch (e) {
            reject(e)
        }
    })
}

let checkRequiredFields = (data) => {
    let arrField = ['doctorId', 'contentHTML', 'contentMarkdown', 'actions', 'description', 'selectedPrice',
        'selectedPayment', 'selectedProvince', 'note', 'specialtyId', 'clinicId'];
    let isValid = true, element = '';
    for (let i = 0; i < arrField.length; i++) {
        if (!data[arrField[i]]) {
            isValid = false;
            element = arrField[i];
            break;
        }
    }
    return { isValid: isValid, element: element }
}

let updateUserService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    message: 'Missing required parameters!'
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false,
            })
            if (user) {
                user.fullName = data.fullName;
                user.roleId = data.roleId;
                await user.save();
                resolve({
                    errCode: 0,
                    message: `Update user information successful!`
                });
            } else {
                resolve({
                    errCode: 1,
                    message: `The user's not found!`
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllRoleService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let roles = await db.Role.findAll({
                // raw: true,
                attributes: { exclude: ["createdAt", "updatedAt", "description"] },
            });

            resolve({
                errCode: 0,
                message: "OK",
                data: roles
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    handleLoginService: handleLoginService,
    hashUserPassword: hashUserPassword,
    createUserService: createUserService,
    fetchAllUser: fetchAllUser,
    getUserById: getUserById,
    fetchAccountService: fetchAccountService,
    updateUserService: updateUserService,
    getAllRoleService: getAllRoleService,
}