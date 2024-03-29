import bcrypt from 'bcryptjs';
import User from '../models/User';
import Role from '../models/Role';
import Conversation from '../models/Conversation';
import Message from '../models/Message';
import { getRole } from './JWTService';
import { createTokenJWT } from '../middleware/JWTAction';
import { deleteImageByPublicId } from '../utils/cloudinaryUtils';
import _ from 'lodash';

const salt = bcrypt.genSaltSync(10);

// let checkUserEmail = (userEmail) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let user = await User.findOne({ email: userEmail });
//             if (user) {
//                 resolve(true)
//             } else {
//                 resolve(false)
//             }
//         } catch (e) {
//             reject(e)
//         }
//     })
// }

let fetchUserByEmailOrStudentId = async (emailOrStudentId) => {
    const email = await User.findOne({ email: emailOrStudentId }).select({ createdAt: 0, updatedAt: 0 });
    const studentId = await User.findOne({ studentId: emailOrStudentId }).select({ __v: 0, createdAt: 0, updatedAt: 0 });
    return email || studentId;
};

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

let handleLoginGoogleService = async (_id, type) => {
    try {
        const role = await Role.findOne({ name: type });
        if (!role) {
            return;
        }
        let user = {};
        const userFromDB = await User.findOne({ _id: _id })
            .select({
                public_id: 0,
                __v: 0,
                createdAt: 0,
                updatedAt: 0,
                googleId: 0,
                password: 0,
            });
        if (userFromDB) {
            user = {
                ...userFromDB._doc,
                roleID: role._id
            };
            await User.updateOne({ _id: user._id }, user);
            user.roleID = role._id;
            user.role = role.name;
        }

        const payload = { user };
        const token = createTokenJWT(payload);

        const response = {
            errCode: 0,
            message: "Ok",
            data: {
                access_token: token,
                user,
            }
        };

        return response;
    } catch (e) {
        throw e;
    }
}

let handleLoginService = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = {}
            const userFromDB = await fetchUserByEmailOrStudentId(email);
            if (userFromDB) {
                let isPasswordCorrect = await bcrypt.compareSync(password, userFromDB.password);
                if (isPasswordCorrect) {
                    const role = await getRole(userFromDB);
                    let user = {
                        ...userFromDB._doc,
                    };
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

            resolve(response)
        } catch (e) {
            reject(e)
        }
    })
}

let fetchAccountService = (_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = {};
            const userFromDB = await User.findOne({ _id: _id })
                .select({
                    public_id: 0,
                    __v: 0,
                    createdAt: 0,
                    updatedAt: 0,
                    googleId: 0,
                    password: 0,
                })
            if (userFromDB) {
                const role = await getRole(userFromDB);
                user = {
                    ...userFromDB._doc,
                    role: role.name
                };
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
            // let users = await User.findAll({
            //     attributes: { exclude: ["password"] },
            //     include: [
            //         { model: db.Role, as: 'roleData', attributes: ['name'] },
            //     ],
            //     raw: false,
            // });

            let users = await User.find({}, { password: 0 })
                .populate('roleID', 'name');
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

let fetchDataUserForStatService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const usersFromDB = await User.find({}).populate('roleID', 'name')
                .sort({ createdAt: -1 })
                .select({
                    _id: 1,
                });
            let userStat = {}
            for (let i = 0; i < usersFromDB.length; i++) {
                let role = usersFromDB[i].roleID;
                let roleId = role._id.toString();
                if (!userStat[roleId]) {
                    userStat[roleId] = {
                        role: role.name,
                        count: 1
                    }
                } else {
                    userStat[roleId].count++;
                }
            }
            const result = Object.values(userStat);
            resolve({
                errCode: 0,
                message: "OK",
                data: result
            })
        } catch (e) {
            reject(e)
        }
    })
}

let fetchUserById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await User.findOne({
                // raw: true,
                _id: id
            }).select({
                __v: 0,
                createdAt: 0,
                updatedAt: 0,
                email_verified: 0,
                password: 0,
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
                let res = await User.create({
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
            if (!data._id) {
                resolve({
                    errCode: 2,
                    message: 'Missing required parameters!'
                })
            }
            let user = await User.findOne({
                _id: data._id
            })
            // console.log("check res", user);
            if (user) {
                user.name = data.name;
                user.description = data.description;
                user.image = data.image;
                user.public_id = data.public_id;
                user.roleID = data.roleID;
                user.updatedAt = new Date();
                // await user.save(); // lưu 1 đối tượng ko quan tâm đã có hay chưa
                await User.updateOne({ _id: data._id }, user);
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
            if (!data._id) {
                resolve({
                    errCode: 2,
                    message: 'Missing required parameters!'
                })
            }
            let user = await User.findOne({
                _id: data._id
            })
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            if (user) {
                user.password = hashPasswordFromBcrypt;
                await User.updateOne({ _id: data._id }, user);
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

let changeUserFacultyService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data._id) {
                resolve({
                    errCode: 2,
                    message: 'Missing required parameters!'
                })
            }
            let user = await User.findOne({
                _id: data._id
            })
            if (user) {
                user.faculty = data.faculty;
                user.studentId = data.studentId;
                await User.updateOne({ _id: data._id }, user);
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

let changeDepartmentFacultyService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data._id) {
                resolve({
                    errCode: 2,
                    message: 'Missing required parameters!'
                })
            }
            let user = await User.findOne({
                _id: data._id
            })
            if (user) {
                user.faculty = data.faculty;
                await User.updateOne({ _id: data._id }, user);
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

let deleteUserService = (_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!_id) {
                resolve({
                    errCode: 2,
                    message: 'Missing required parameters!'
                })
            }
            let user = await User.findById(_id);
            if (user) {
                if (!_.isEmpty(user.public_id)) {
                    await deleteImageByPublicId(user.public_id);
                }
                await User.deleteOne({ _id: _id });
                // let allUsers = getAllUser();  
                resolve({
                    errCode: 0,
                    message: `OK`
                })
            } else {
                resolve({
                    errCode: 1,
                    message: `The user not found!`
                }) // return
            }
        } catch (e) {
            console.log("check error", e);
            reject(e)
        }
    })
}

let getAllRoleService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let roles = await Role.find({}).select({ createdAt: 0, updatedAt: 0, description: 0 });
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

let fetchDepartmentUserService = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let departmentRole = await Role.findOne({ name: 'Department' });
            if (departmentRole) {
                let users = await User.find({ roleID: departmentRole._id })
                    .select({
                        password: 0,
                        public_id: 0,
                        createdAt: 0,
                        updatedAt: 0,
                        studentId: 0,
                        faculty: 0,
                        __v: 0,
                    });
                for (let i = 0; i < users.length; i++) {
                    const conversation = await Conversation.findOne({
                        participants: { $all: [userId, users[i]._id] }
                    }).select({ __v: false, _id: false, isNewConversation: false, createdAt: false, updatedAt: false })
                    // console.log("check conversation", conversation);
                    if (conversation) {
                        let conversationId = conversation.conversationId;
                        let lastMessage = await Message.findOne({ conversation: conversationId })
                            .sort({ createdAt: -1 })
                            .select({ __v: 0, updatedAt: 0, __t: 0, _id: 0, createdAt: 0 });
                        let newUser = {
                            ...users[i]._doc,
                            conversationId: conversationId,
                            lastMessage: lastMessage
                        };
                        // users.pop(users[i]);
                        users.splice(i, 1, newUser);
                    }
                }
                // users.reverse();
                // console.log("check after produce users", users);
                // return;
                resolve({
                    errCode: 0,
                    message: "OK",
                    data: users
                })
            } else {
                resolve({
                    errCode: 1,
                    message: "Department role not found!",
                })
            }
        } catch (e) {
            console.log("check e", e);
            reject(e)
        }
    })
}

module.exports = {
    handleLoginGoogleService: handleLoginGoogleService,
    handleLoginService: handleLoginService,
    hashUserPassword: hashUserPassword,
    createUserService: createUserService,
    fetchAllUser: fetchAllUser,
    fetchDataUserForStatService: fetchDataUserForStatService,
    fetchUserById: fetchUserById,
    fetchAccountService: fetchAccountService,
    updateUserService: updateUserService,
    changeUserPasswordService: changeUserPasswordService,
    changeUserFacultyService: changeUserFacultyService,
    changeDepartmentFacultyService: changeDepartmentFacultyService,
    deleteUserService: deleteUserService,
    getAllRoleService: getAllRoleService,
    fetchDepartmentUserService: fetchDepartmentUserService
}