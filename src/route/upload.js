import Express from "express";
import multer from 'multer';
import cloudinary from "../config/cloudinary";
import storage from "../storage/cloudinaryStorage";
import { deleteImageByPublicId } from '../utils/cloudinaryUtils';

const upload = multer({ storage: storage });

const router = Express.Router();

router.post('/upload', upload.single('file'), async (req, res) => {
    console.log("cehck file", req.file);
    console.log("cehck public_id", req.body.public_id);
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
})

export default router;