import cloudinary from "../config/cloudinary";


async function deleteImageByPublicId(public_id) {
    try {
        const { result } = await cloudinary.uploader.destroy(public_id);
        if (result === "not found") {
            console.log("No public_id provided");
        }
        if (result !== "ok") {
            console.log("Failed to delete image");
        }
        return "Image deleted successfully";
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    deleteImageByPublicId,
}