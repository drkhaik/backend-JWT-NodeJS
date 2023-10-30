import Express from "express";

let router = Express.Router();

let initWebRoutes = (app) => {
    router.get('/', (req, res) => {
        return res.send('Hello World !');
    })
    return app.use("/", router);
}

module.exports = initWebRoutes;