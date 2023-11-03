require('dotenv').config();
import Express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import initApiRoutes from "./route/api";
import connectDB from "./config/connectDB";
import cors from "cors";
import corsConfig from "./config/cors";

const app = Express();
const port = process.env.PORT || 6969;

// config Cors
corsConfig(app);

app.use(cors());

//config view engine
viewEngine(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// test connection db
connectDB();

// init web route
initWebRoutes(app);
initApiRoutes(app);

app.listen(port, () => {
    // call back
    console.log("Backend Node Js is running on the port: " + port);
})

