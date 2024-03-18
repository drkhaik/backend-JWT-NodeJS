import Express from "express";
import postController from '../controllers/postController';

const router = Express.Router();

router.post('/post', postController.createPost);
router.get('/post', postController.fetchAllPost);
router.get('/post/:id', postController.fetchPostsByFaculty);
router.post('/post/department/history', postController.fetchMorePostsByFaculty);
router.put('/post', postController.updatePost);
router.delete('/post/:id', postController.deletePost);
router.post('/post/history', postController.fetchMorePost);


export default router;