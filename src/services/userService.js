import bcrypt from 'bcryptjs';
import db from '../models';
import { getRole } from './JWTService';
import { createTokenJWT } from '../middleware/JWTAction';
import { deleteImageByPublicId } from '../utils/cloudinaryUtils';
import _ from 'lodash';

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
            let isExist = await checkUserEmail(email);
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

let fetchAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                attributes: { exclude: ["password"] },
                include: [
                    { model: db.Role, as: 'roleData', attributes: ['name'] },
                ],
                raw: false,
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

let createUserService = (data) => {
    console.log("check data", data);
    // return;
    return new Promise(async (resolve, reject) => {
        try {
            let isExist = await checkUserEmail(data.email);
            if (isExist) {
                resolve({
                    errCode: 1,
                    message: "Email already exists!"
                })
            } else {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                let res = await db.User.create({
                    name: data.name,
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    description: data.description,
                    image: data.image,
                    public_id: data.public_id,
                    roleID: data.roleID,
                    createdAt: new Date(),
                    updatedAt: new Date()
                })
                console.log("check res", res);
                resolve({
                    errCode: 0,
                    message: "OK",
                })
            }
        } catch (e) {
            // console.log("check error", e);
            reject(e);
        }
    })
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
                user.name = data.name;
                user.description = data.description;
                user.image = data.image;
                user.public_id = data.public_id;
                user.roleID = data.roleID;
                user.updatedAt = new Date();
                await user.save();
                resolve({
                    errCode: 0,
                    message: `Ok`
                });
            } else {
                resolve({
                    errCode: 1,
                    message: `The User not found!`
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let changeUserPasswordService = (data) => {
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
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            if (user) {
                user.password = hashPasswordFromBcrypt;
                await user.save();
                resolve({
                    errCode: 0,
                    message: `Ok`
                });
            } else {
                resolve({
                    errCode: 1,
                    message: `The User not found!`
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let deleteUserService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 2,
                    message: 'Missing required parameters!'
                })
            }
            let user = await db.User.findByPk(id);
            console.log("check user", user);
            // return;
            if (user) {
                if (!_.isEmpty(user.public_id)) {
                    await deleteImageByPublicId(user.public_id);
                }
                await db.User.destroy({
                    where: { id: id }
                });
                // let allUsers = getAllUser();  
                resolve({
                    errCode: 0,
                    message: `OK`
                })
            } else {
                resolve({
                    errCode: 1,
                    message: `The User not found!`
                }) // return
            }
        } catch (e) {
            reject(e)
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
    changeUserPasswordService: changeUserPasswordService,
    deleteUserService: deleteUserService,
    getAllRoleService: getAllRoleService,
}