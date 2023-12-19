require('dotenv').config();
import Express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initApiRoutes from "./route";
import connectDB from "./config/connectDB";
import corsConfig from "./config/cors";
import cookieParser from 'cookie-parser';

const app = Express();
const port = process.env.PORT || 6969;

// config Cors
corsConfig(app);

//config view engine
viewEngine(app);

// config cookie parser
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// config cookie parser
app.use(cookieParser());

// test connection db
connectDB();

// // test JWT
// createTokenJWT();
// let decoded = verifyToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZHJraGFpayIsImFkZHJlc3MiOiJoYSBub2kiLCJpYXQiOjE2OTkwMjk5NTZ9.C4oRk1YX-HR6YA0pCBWFU3AkzeU3mRVoypSQ7rCcxn4");
// console.log(decoded);

initApiRoutes(app);

app.use((req, res) => {
    return res.send('404 not found!');
})

app.listen(port, () => {
    // call back
    console.log("Backend Node Js is running on the port: " + port);
})

