import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: 'dt50douca',
    api_key: '114219518254897',
    api_secret: 'EkJP7y8UOwwoBi7tCcWW1MOu__A',
    secure: true
});

export default cloudinary;