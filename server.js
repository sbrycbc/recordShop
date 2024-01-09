/** EXTERNAL DEPENDENCIES */
require('dotenv').config();
const express = require('express');
const path = require("path");
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const multer = require('multer');
const cookieParser = require('cookie-parser');


/** VARIABLES */
const port = process.env.PORT || 8000
const app = express();


/**CONNECT TO DB */
const db = mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`)
    .then(() => console.log("connected to db"))
    .catch((err) => console.log("something went wrong", err.reason))


/** REQUEST PARSERS */
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/** ERROR HANDLING */
app.use((req, res, next) => {
    const error = new Error("Looks like something broke...");
    error.statusCode = 404;
    next(error);
});

app.use((err, req, res, next) => {

    res.status(err.statusCode || 500).send({
        error: {
            message: err.message
        }
    });

});


/** LISTENER */
app.listen(port, () => {
    console.log(`server is listenig on ${port} ...🐒`)
})