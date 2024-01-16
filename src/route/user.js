import Express from "express";
import { checkAdminPermission } from '../middleware/JWTAction';
import userController from '../controllers/userController';

const router = Express.Router();

router.post('/login', userController.handleLogin);
router.get('/fetch-account', userController.fetchAccount);
router.post('/logout', userController.handleLogout);

router.get('/users', checkAdminPermission, userController.fetchAllUser);
router.get('/user/:id', checkAdminPermission, userController.fetchUser);
router.post('/user', userController.createNewUser);
router.put('/user', userController.updateUser);
router.put('/user/change-password', userController.changeUserPassword);
router.delete('/user/:id', checkAdminPermission, userController.deleteUser);

router.get('/role', userController.getAllRole);

router.get('/users/department/', userController.fetchDepartmentUser);

export default router;