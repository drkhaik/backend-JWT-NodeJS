import bcrypt from 'bcryptjs';
import db from '../models';

const salt = bcrypt.genSaltSync(10);

let checkEmailExist = (emailInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let department = await db.Department.findOne({
                where: { email: emailInput }
            })
            if (department) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e)
        }
    })
}

let hashPassword = async (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}

let createDepartmentService = (data) => {
    console.log("check data create", data);
    return new Promise(async (resolve, reject) => {
        try {
            let isExist = await checkEmailExist(data.email);
            if (isExist) {
                resolve({
                    errCode: 1,
                    message: "Email already exists!"
                })
            } else {
                let hashPasswordFromBcrypt = await hashPassword(data.password);
                let res = await db.Department.create({
                    name: data.name,
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    description: data.description,
                    image: data.image,
                    roleID: data.roleID,
                    createdAt: new Date(),
                    updatedAt: new Date()
                })
                // console.log("check res", res);
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

let getAllDepartment = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let departments = await db.Department.findAll({
                // raw: true,
                attributes: { exclude: ["password"] },
                include: [
                    { model: db.Role, as: 'roleNameForDepartment', attributes: ['name'] },
                ],
                raw: false,
            });

            if (departments && departments.length > 0) {
                departments.map(item => {
                    item.image = new Buffer(item.image, 'base64').toString('binary');
                    return item;
                })
            }

            resolve({
                errCode: 0,
                message: "OK",
                data: departments
            })
        } catch (e) {
            reject(e)
        }
    })
}

let updateDepartmentInfoService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    message: 'Missing required parameters!'
                })
            }
            let department = await db.Department.findOne({
                where: { id: data.id },
                raw: false,
            })
            if (department) {
                department.name = data.name;
                department.description = data.description;
                department.image = data.image;
                department.roleID = data.roleID;
                department.updatedAt = new Date();
                await department.save();
                resolve({
                    errCode: 0,
                    message: `Ok`
                });
            } else {
                resolve({
                    errCode: 1,
                    message: `The Department not found 123!`
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let changeDepartmentPasswordService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    message: 'Missing required parameters!'
                })
            }
            let department = await db.Department.findOne({
                where: { id: data.id },
                raw: false,
            })
            let hashPasswordFromBcrypt = await hashPassword(data.password);
            if (department) {
                department.password = hashPasswordFromBcrypt;
                await department.save();
                resolve({
                    errCode: 0,
                    message: `Ok`
                });
            } else {
                resolve({
                    errCode: 1,
                    message: `The Department not found!`
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let deleteDepartmentService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 2,
                    message: 'Missing required parameters!'
                })
            }
            let department = await db.Department.findByPk(id);
            if (department) {
                await db.Department.destroy({
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
                    message: `The Department not found!`
                }) // return
            }
        } catch (e) {
            reject(e)
        }
    })
}



module.exports = {
    createDepartmentService: createDepartmentService,
    getAllDepartment: getAllDepartment,
    updateDepartmentInfoService: updateDepartmentInfoService,
    changeDepartmentPasswordService: changeDepartmentPasswordService,
    deleteDepartmentService: deleteDepartmentService
}