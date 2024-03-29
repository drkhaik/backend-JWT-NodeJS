import Express from "express";
import documentController from '../controllers/documentController';

const router = Express.Router();

router.post('/document', documentController.createDocument);
router.get('/document/subject/:id', documentController.fetchDocumentBySubjectId);
// router.get('/document', documentController.fetchAllDocument);
// router.put('/document', documentController.updateDocument);
router.delete('/document/:id', documentController.deleteDocument);
router.get('/document/stat', documentController.fetchAllDocumentForStat);


export default router;