require('dotenv').config();
const mongoose = require('mongoose');

const connectToDatabase = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(process.env.DATABASE_URI);

        mongoose.connection.on("error", (err) => {
            console.log("Connect to DB fail", err.message);
            reject(err);
        });

        mongoose.connection.once("open", () => {
            console.log("Connect to DB success");
            resolve();
        });
    })
};

module.exports = connectToDatabase;