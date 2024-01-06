import Express from "express";
import messageController from '../controllers/messageController';

const router = Express.Router();


router.get('/message/history/:id', messageController.fetchMessageHistory);
router.post('/message/history', messageController.fetchMoreMessage);


export default router;