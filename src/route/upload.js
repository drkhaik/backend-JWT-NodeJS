import Express from "express";
import fs from 'fs';
import multer from 'multer';
import { imageStorage } from "../storage/cloudinaryStorage";
import { deleteImageByPublicId } from '../utils/cloudinaryUtils';
import mime from 'mime-types';
import { v2 as cloudinary } from 'cloudinary';

const router = Express.Router();

const uploadImage = multer({ storage: imageStorage });
const uploadMessageFile = multer({
    dest: 'public/',
    fileFilter: (req, file, cb) => {
        const mimeType = mime.lookup(file.originalname);
        if (
            mimeType === 'image/jpeg' ||
            mimeType === 'image/png' ||
            mimeType === 'image/jpg' ||
            mimeType === 'application/pdf' ||
            mimeType === 'application/zip' ||
            mimeType === 'application/msword' ||
            mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
            mimeType === 'application/vnd.ms-excel' ||
            mimeType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ) {
            cb(null, true);
        } else {
            cb(new Error('Only JPEG, PNG, PDF, Word, and Excel files are allowed'));
        }
    }
});


router.post('/upload/image', uploadImage.single('file'), async (req, res) => {
    // console.log("cehck file", req.file);
    // console.log("cehck public_id", req.body.public_id);
    // return;
    try {
        if (req.body.public_id) {
            const public_id = req.body.public_id;
            await deleteImageByPublicId(public_id);
        }
        if (req.file && req.file.path) {
            const file = req.file;
            let data = {
                url: file.path,
                public_id: file.filename
            }
            res.status(200).json({
                errCode: 0,
                data: data
            });
        } else {
            res.status(400).send('No file uploaded');
        }
    } catch (error) {
        console.error(error);
        res.status(error.status || 500).send(error.message);
    }
});

router.post('/upload/file', uploadMessageFile.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            throw new Error('No file uploaded');
        }
        const result = await cloudinary.uploader.upload(req.file.path, {
            resource_type: 'auto',
            folder: 'message-file-uef',
            // mutate the public_id so u can not upload another file with the
            // same name, because it will have the same url.
            public_id: req.file.originalname,
        });

        fs.unlinkSync(req.file.path);
        const data = {
            url: result.secure_url,
            public_id: result.public_id
        };

        res.status(200).json({
            errCode: 0,
            data: data
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Upload to Cloudinary failed');
    }
});


// router.post('/upload/file', uploadMessageFile.single('file'), async (req, res) => {
//     console.log("cehck file", req.file);
//     // console.log("cehck public_id", req.body.public_id);
//     // return;
//     try {
//         if (req.file && req.file.path) {
//             const file = req.file;
//             let data = {
//                 url: file.path,
//                 public_id: file.filename,
//                 fileName: file.originalname
//             }
//             res.status(200).json({
//                 errCode: 0,
//                 data: data
//             });
//         } else {
//             res.status(400).send('No file uploaded');
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(error.status || 500).send(error.message);
//     }
// });


export default router;