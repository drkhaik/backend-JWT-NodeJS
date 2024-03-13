import Faculty from "../models/Faculty";

let createFacultyService = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await Faculty.create({
                name: data.name,
                // description: data.description,
            });
            console.log("check res", res);
            if (!res && !res._id) {
                resolve({
                    errCode: 1,
                    message: "Error from server",
                })
            }
            resolve({
                errCode: 0,
                message: "OK",
            })
        } catch (e) {
            reject(e)
        }
    })
}

let fetchAllFacultyService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let faculties = await Faculty.find({})
                .sort({ createdAt: -1 })
                .select({
                    __v: 0,
                    createdAt: 0,
                    updatedAt: 0
                });
            resolve({
                errCode: 0,
                message: "OK",
                data: faculties
            })
        } catch (e) {
            reject(e)
        }
    })
}


let updateFacultyService = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let faculty = await Faculty.findOne({
                _id: data._id
            });
            if (faculty) {
                faculty.name = data.name;
                // faculty.description = data.description;
                await Faculty.updateOne({ _id: data._id }, faculty);
                resolve({
                    errCode: 0,
                    message: `Ok`
                });
            } else {
                resolve({
                    errCode: 1,
                    message: `The Faculty not found!`
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let deleteFacultyService = async (_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!_id) {
                resolve({
                    errCode: 2,
                    message: 'Missing required parameters!'
                })
            }
            let faculty = await Faculty.findById(_id);
            if (faculty) {
                await Faculty.deleteOne({ _id: _id });
                resolve({
                    errCode: 0,
                    message: `OK`
                })
            } else {
                resolve({
                    errCode: 1,
                    message: `The faculty not found!`
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createFacultyService: createFacultyService,
    fetchAllFacultyService: fetchAllFacultyService,
    updateFacultyService: updateFacultyService,
    deleteFacultyService: deleteFacultyService,
}