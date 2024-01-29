import Express from "express";
import facultyController from '../controllers/facultyController';

const router = Express.Router();

router.post('/faculty', facultyController.createFaculty);
router.get('/faculty', facultyController.fetchAllFaculty);
router.put('/faculty', facultyController.updateFaculty);
router.delete('/faculty/:id', facultyController.deleteFaculty);


export default router;