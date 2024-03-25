require('dotenv').config();
import Express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initApiRoutes from "./route";
import connectToDatabase from "./config/connectDB";
import corsConfig from "./config/cors";
import cookieParser from 'cookie-parser';
import socketConfig from "./services/socketService";
const session = require('express-session');
import './middleware/passportGoogleSSO';
import passport from "passport";
import helmet from "helmet";
import cookieSession from "cookie-session";
import cors from 'cors';
const MongoDBStore = require('connect-mongodb-session')(session);


const app = Express();
const port = process.env.PORT || 6969;

// config Cors
corsConfig(app);
app.use(cors({ credentials: true, origin: process.env.URL_FRONTEND, methods: ['GET', 'POST', 'PUT', 'DELETE'] }));

//config view engine
viewEngine(app);

// config cookie parser
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// app.set("trust proxy", 1);

// config cookie parser
app.use(cookieParser());
app.use(helmet());

const store = new MongoDBStore({
    uri: process.env.PRODUCTION_DATABASE_URI,
    collection: 'sessions'
});

store.on('error', function (error) {
    console.log(error);
});


app.use(session({
    secret: process.env.JWT_SECRET,
    store: store,
    resave: false,
    saveUninitialized: false
}));

// app.use(session({
//     secret: process.env.JWT_SECRET,
//     store: store,
//     resave: true,
//     saveUninitialized: true,
//     cookie: {
//         // secure: true, // Set to true if you're using HTTPS
//         // httpOnly: true,
//         maxAge: 1000 * 60 * 60,
//         // sameSite: "none",
//         // domain: `${process.env.URL_FRONTEND}`,
//         // path: '/'
//     }
// }));

// app.use(
//     cookieSession({
//         maxAge: 60 * 60 * 1000,
//         sameSite: 'none',
//         httpOnly: true,
//         secure: true,
//         keys: [process.env.JWT_SECRET],
//     })
// );

app.use(passport.initialize());
app.use(passport.session());


// // test JWT
// createTokenJWT();
// let decoded = verifyToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZHJraGFpayIsImFkZHJlc3MiOiJoYSBub2kiLCJpYXQiOjE2OTkwMjk5NTZ9.C4oRk1YX-HR6YA0pCBWFU3AkzeU3mRVoypSQ7rCcxn4");
// console.log(decoded);

const startServer = async () => {
    try {
        await connectToDatabase();
        initApiRoutes(app);
        app.use((req, res) => {
            return res.send('404 not found!');
        });
        const server = app.listen(port, () => {
            console.log("Backend Node Js is running on the port: " + port);
        });
        socketConfig(server);

    } catch (error) {
        console.error('Error starting server:', error);
    }
};

startServer();