import Document from "../models/Document";
import { deleteFileByPublicId } from '../utils/cloudinaryUtils';
import _ from 'lodash';


let createDocumentService = async (data) => {
    return new Promise(async (resolve, reject) => {
        const { name, author, subject, fileUrl, public_id, fileName, fileType, fileSize } = data;
        try {
            const res = await Document.create({
                name: name,
                author: author,
                subject: subject,
                fileName: fileName,
                fileUrl: fileUrl,
                public_id: public_id,
                fileType: fileType,
                fileSize: fileSize,
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

let fetchDocumentBySubjectIdService = (subjectId) => {
    return new Promise(async (resolve, reject) => {
        try {
            // console.log("check subjectId", subjectId);
            let documents = await Document.find({ subject: subjectId })
                .populate('author', 'name image')
                .sort({ createdAt: -1 })
                .select({
                    __v: 0,
                    updatedAt: 0,
                    public_id: 0,
                });

            // console.log("check documents", documents);
            resolve({
                errCode: 0,
                message: "OK",
                data: documents
            })
        } catch (e) {
            reject(e)
        }
    })
}

// let fetchAllDocumentService = () => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let documents = await Document.find({})
//                 .sort({ createdAt: -1 })
//                 .select({
//                     __v: 0,
//                     createdAt: 0,
//                     updatedAt: 0
//                 });

//             resolve({
//                 errCode: 0,
//                 message: "OK",
//                 data: documents
//             })
//         } catch (e) {
//             reject(e)
//         }
//     })
// }

let deleteDocumentService = async (_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!_id) {
                resolve({
                    errCode: 2,
                    message: 'Missing required parameters!'
                })
            }
            let document = await Document.findById(_id);
            if (document) {
                if (!_.isEmpty(document.public_id)) {
                    await deleteFileByPublicId(document.public_id);
                }
                // return;
                await Document.deleteOne({ _id: _id });
                resolve({
                    errCode: 0,
                    message: `OK`
                })
            } else {
                resolve({
                    errCode: 1,
                    message: `The document not found!`
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let fetchAllDocumentForStatService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const documentsFromDB = await Document.find({}).populate('author', 'name')
                .sort({ createdAt: -1 })
                .select({
                    _id: 1,
                })
            console.log("check documentsFromDB", documentsFromDB);
            let documentStat = {}
            for (let i = 0; i < documentsFromDB.length; i++) {
                let author = documentsFromDB[i].author;
                let authorId = author._id.toString();
                if (!documentStat[authorId]) {
                    documentStat[authorId] = {
                        author: author.name,
                        count: 1
                    }
                } else {
                    documentStat[authorId].count++;
                }
            }
            const result = Object.values(documentStat);
            console.log("check result", result);
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

module.exports = {
    createDocumentService: createDocumentService,
    fetchDocumentBySubjectIdService: fetchDocumentBySubjectIdService,
    // fetchAllDocumentService: fetchAllDocumentService,
    // updateDocumentService: updateDocumentService,
    deleteDocumentService: deleteDocumentService,
    fetchAllDocumentForStatService: fetchAllDocumentForStatService,
}