// server/app.js

/** require dependencies */
const express = require("express");
//const routes = require('./routes')
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
let signupRecruiter = require('./routes/signupRecruiter');
let signinRecruiter = require('./routes/signinRecruiter');
let expressValidator = require("express-validator");
var morgan = require('morgan');
let cors = require('cors');
const config = require('./config');
const app = express()
app.use(cookieParser());
const router = express.Router()
var passport = require('passport');
app.use(passport.initialize());

let port = 5000 || process.env.PORT

/** set up routes {API Endpoints} */
//routes(router)

/** set up middlewares */

app.use(cors({ origin: `http://${config.frontend_host}`, credentials: true }));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', `http://${config.frontend_host}`);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

app.use(expressValidator());
app.use(morgan('dev'));

// define routes
app.use("/signup_recruiter/", signupRecruiter);
app.use("/signin_recruiter/", signinRecruiter);

/** start server */
app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
});