import Express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
require('dotenv').config();

let app = Express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let port = process.env.PORT || 6969;
app.listen(port, () => {
    // call back
    console.log("Backend Node Js is running on the port: " + port);
})

viewEngine(app);
initWebRoutes(app);