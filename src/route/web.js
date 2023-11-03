import Express from "express";
import userController from '../controllers/userController';

let router = Express.Router();

let initWebRoutes = (app) => {

    router.get('/api/v1/user', userController.getUsers);
    router.get('/api/v1/user/:id', userController.getUser);
    router.post('/api/v1/user', userController.createNewUser);
    router.put('/api/v1/user', userController.createNewUser);
    router.delete('/api/v1/user', userController.createNewUser);

    return app.use("/", router);
}

module.exports = initWebRoutes;