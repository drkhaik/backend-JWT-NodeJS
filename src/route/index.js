import Express from "express";
import { checkTokenJWT } from '../middleware/JWTAction';
import uploadRoute from './upload';
import userRoute from './user';
import conversationRoute from './conversation';
import messageRoute from './message';
import postRoute from './post';
import facultyRoute from './faculty';

const router = Express.Router();

const initApiRoutes = (app) => {

    router.all('*', checkTokenJWT);
    router.use(userRoute);
    router.use(conversationRoute);
    router.use(messageRoute);
    router.use(postRoute);
    router.use(uploadRoute);
    router.use(facultyRoute);

    return app.use("/api/v1", router);
}

module.exports = initApiRoutes;