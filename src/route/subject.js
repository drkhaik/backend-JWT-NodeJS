import Express from "express";
import subjectController from '../controllers/subjectController';

const router = Express.Router();

router.post('/subject', subjectController.createSubject);
router.get('/subject', subjectController.fetchAllSubject);
router.put('/subject', subjectController.updateSubject);
router.delete('/subject/:id', subjectController.deleteSubject);


export default router;