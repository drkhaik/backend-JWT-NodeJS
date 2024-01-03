import Express from "express";
import conversationController from '../controllers/conversationController';

const router = Express.Router();


router.post('/conversation/', conversationController.createConversation);
router.get('/conversation/:id', conversationController.fetchConversationByUserId);


export default router;