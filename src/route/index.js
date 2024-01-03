import Express from "express";
import { checkTokenJWT } from '../middleware/JWTAction';
import uploadRoute from './upload';
import userRoute from './user';
import conversationRoute from './conversation';
import messageRoute from './message';

const router = Express.Router();

const initApiRoutes = (app) => {

    router.all('*', checkTokenJWT);
    router.use(userRoute);
    router.use(conversationRoute);
    router.use(messageRoute);
    router.use(uploadRoute);

    return app.use("/api/v1", router);
}

module.exports = initApiRoutes;