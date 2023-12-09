import Express from "express";
import { checkTokenJWT, checkUserPermission } from '../middleware/JWTAction';
import userController from '../controllers/userController';
import departmentController from '../controllers/departmentController';

const router = Express.Router();

const initApiRoutes = (app) => {

    router.all('*', checkTokenJWT, checkUserPermission);

    router.post('/login', userController.handleLogin);
    router.get('/fetch-account', userController.fetchAccount);
    router.post('/logout', userController.handleLogout);

    router.get('/user/', userController.fetchAllUser);
    router.get('/user/:id', userController.fetchUser);
    router.post('/user', userController.createNewUser);
    router.put('/user', userController.updateUser);
    router.delete('/user', userController.createNewUser);

    router.get('/role', userController.getAllRole);

    router.post('/department', departmentController.createDepartment);
    router.get('/department', departmentController.getAllDepartment);
    // router.get('/department/:id', departmentController.getDepartment);
    router.put('/department/', departmentController.updateDepartmentInfo);
    router.put('/department/change-password', departmentController.changeDepartmentPassword);
    router.delete('/department/:id', departmentController.deleteDepartment);

    return app.use("/api/v1", router);
}

module.exports = initApiRoutes;