import postService from '../services/postService';

let createPost = async (req, res) => {
    try {
        let response = await postService.createPostService(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: "Error from server...",
        })
    }
}

let fetchAllPost = async (req, res) => {
    try {
        let response = await postService.fetchAllPostService();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: "Error from server...",
        })
    }
}

let updatePost = async (req, res) => {
    try {
        let response = await postService.updatePostService(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: "Error from server...",
        })
    }
}

let deletePost = async (req, res) => {
    try {
        let response = await postService.deletePostService(req.params.id);
        return res.status(200).json(response);
    } catch (e) {
        console.log("check e", e);
        return res.status(200).json({
            errCode: -1,
            message: "Error from server...",
        })
    }
}

module.exports = {
    createPost,
    fetchAllPost,
    updatePost,
    deletePost,
}