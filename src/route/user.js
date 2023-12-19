import Express from "express";
import { checkTokenJWT, checkUserPermission } from '../middleware/JWTAction';
import userController from '../controllers/userController';

const router = Express.Router();

router.all('*', checkTokenJWT, checkUserPermission);

router.post('/login', userController.handleLogin);
router.get('/fetch-account', userController.fetchAccount);
router.post('/logout', userController.handleLogout);

router.get('/user/', userController.fetchAllUser);
router.get('/user/:id', userController.fetchUser);
router.post('/user', userController.createNewUser);
router.put('/user', userController.updateUser);
router.put('/user/change-password', userController.changeUserPassword);
router.delete('/user/:id', userController.deleteUser);

router.get('/role', userController.getAllRole);

export default router;