import Express from "express";
import userController from '../controllers/userController';

let router = Express.Router();

let initApiRoutes = (app) => {

    router.post('/login', userController.handleLogin);

    router.get('/user/:id', userController.getUser);
    router.get('/user/:id', userController.getUser);
    router.post('/user', userController.createNewUser);
    router.put('/user', userController.createNewUser);
    router.delete('/user', userController.createNewUser);

    return app.use("/api/v1", router);
}

module.exports = initApiRoutes;