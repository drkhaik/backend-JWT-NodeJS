import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary';

const imageStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'images-uef',
        format: 'png',
        format: 'jpg',
        format: 'jpeg',
    }
});

// const messageFileStorage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: (req, file) => {
//         return {
//             folder: 'message-file-uef',
//             resource_type: 'auto',
//             public_id: file.originalname
//         }
//     },
// });

module.exports = {
    imageStorage: imageStorage,
    // messageFileStorage: messageFileStorage
}