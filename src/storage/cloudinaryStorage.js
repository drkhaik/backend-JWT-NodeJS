import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary';

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'images-uef',
        format: 'png',
        format: 'jpg',
        format: 'jpeg',
    }
});

export default storage;