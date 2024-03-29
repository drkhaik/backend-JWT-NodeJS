import Subject from "../models/Subject";

let createSubjectService = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await Subject.create({
                name: data.name,
            });
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

let fetchAllSubjectService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let subjects = await Subject.find({})
                .sort({ createdAt: -1 })
                .select({
                    __v: 0,
                    createdAt: 0,
                    updatedAt: 0
                });
            resolve({
                errCode: 0,
                message: "OK",
                data: subjects
            })
        } catch (e) {
            reject(e)
        }
    })
}


let updateSubjectService = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let subject = await Subject.findOne({
                _id: data._id
            });
            if (subject) {
                subject.name = data.name;
                // subject.description = data.description;
                await Subject.updateOne({ _id: data._id }, subject);
                resolve({
                    errCode: 0,
                    message: `Ok`
                });
            } else {
                resolve({
                    errCode: 1,
                    message: `The Subject not found!`
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let deleteSubjectService = async (_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!_id) {
                resolve({
                    errCode: 2,
                    message: 'Missing required parameters!'
                })
            }
            let subject = await Subject.findById(_id);
            if (subject) {
                await Subject.deleteOne({ _id: _id });
                resolve({
                    errCode: 0,
                    message: `OK`
                })
            } else {
                resolve({
                    errCode: 1,
                    message: `The subject not found!`
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createSubjectService: createSubjectService,
    fetchAllSubjectService: fetchAllSubjectService,
    updateSubjectService: updateSubjectService,
    deleteSubjectService: deleteSubjectService,
}