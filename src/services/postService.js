import Post from "../models/Post";

const limitNumberOfPost = 5;
const limitNumberOfFacultyPost = 2;

let createPostService = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await Post.create({
                title: data.title,
                description: data.description,
                author: data.author
            })
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
            reject(e);
        }
    })
}

let fetchAllPostService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let posts = await Post.find({}).populate('author', 'name image')
                .sort({ createdAt: -1 })
                .limit(limitNumberOfPost)
                .select({
                    __v: 0,
                    __t: 0,
                });
            resolve({
                errCode: 0,
                message: "OK",
                data: posts
            })
        } catch (e) {
            reject(e)
        }
    })
}

let fetchAllPostForStatService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const postsFromDB = await Post.find({}).populate('author', 'name')
                .sort({ createdAt: -1 })
                .select({
                    _id: 1,
                })
            let postStat = {}
            for (let i = 0; i < postsFromDB.length; i++) {
                let author = postsFromDB[i].author;
                let authorId = author._id.toString();
                if (!postStat[authorId]) {
                    postStat[authorId] = {
                        author: author.name,
                        count: 1
                    }
                } else {
                    postStat[authorId].count++;
                }
            }
            const result = Object.values(postStat);
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

let fetchPostsByFacultyService = (authorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let posts = await Post.find({
                author: authorId
            })
                .populate('author', 'name image')
                .sort({ createdAt: -1 })
                .limit(limitNumberOfFacultyPost)
                .select({
                    __v: 0,
                    __t: 0,
                });
            resolve({
                errCode: 0,
                message: "OK",
                data: posts
            })
        } catch (e) {
            reject(e)
        }
    })
}

let fetchMorePostsByFacultyService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let posts = await Post.find({
                author: data.authorId,
                _id: { $lt: data.lastPostId }
            })
                .populate('author', 'name image')
                .sort({ createdAt: -1 })
                .limit(limitNumberOfFacultyPost)
                .select({
                    __v: 0,
                    __t: 0,
                });
            resolve({
                errCode: 0,
                message: "OK",
                data: posts
            })
        } catch (e) {
            reject(e)
        }
    })
}

let fetchMorePostService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const posts = await Post.find({
                _id: { $lt: data.lastPostId }
            }).populate('author', 'name image')
                .sort({
                    createdAt: -1
                }).limit(limitNumberOfPost)
                .select({
                    __v: 0,
                    __t: 0,
                    // _id: false,
                    // createdAt: false,
                    // updatedAt: false,
                });
            // console.log("check post list", posts);
            resolve({
                errCode: 0,
                message: "OK",
                data: posts
            })
        } catch (e) {
            reject(e)
        }
    })
}

let updatePostService = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let post = await Post.findOne({
                _id: data._id
            });
            if (post) {
                post.title = data.title;
                post.description = data.description;
                await Post.updateOne({ _id: data._id }, post);
                resolve({
                    errCode: 0,
                    message: `Ok`
                });
            } else {
                resolve({
                    errCode: 2,
                    message: `The Post not found!`
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let deletePostService = async (_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!_id) {
                resolve({
                    errCode: 2,
                    message: 'Missing required parameters!'
                })
            }
            let post = await Post.findById(_id);
            if (post) {
                await Post.deleteOne({ _id: _id });
                resolve({
                    errCode: 0,
                    message: `OK`
                })
            } else {
                resolve({
                    errCode: 1,
                    message: `The post not found!`
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}


module.exports = {
    createPostService: createPostService,
    fetchAllPostService: fetchAllPostService,
    fetchPostsByFacultyService: fetchPostsByFacultyService,
    fetchMorePostsByFacultyService: fetchMorePostsByFacultyService,
    updatePostService: updatePostService,
    deletePostService: deletePostService,
    fetchMorePostService: fetchMorePostService,
    fetchAllPostForStatService: fetchAllPostForStatService,
}