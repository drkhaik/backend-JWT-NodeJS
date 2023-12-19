import Express from "express";
import uploadRoute from './upload';
import userRoute from './user';

const router = Express.Router();

const initApiRoutes = (app) => {

    router.use(userRoute);
    router.use(uploadRoute);

    return app.use("/api/v1", router);
}

module.exports = initApiRoutes;