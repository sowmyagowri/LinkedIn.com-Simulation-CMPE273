// server/app.js

/** require dependencies */
const express = require("express")
const routes = require('./backend/routes')
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');
const app = express()
app.use(cookieParser());
const router = express.Router()
var passport = require('passport');
app.use(passport.initialize());

let port = 5000 || process.env.PORT

/** set up routes {API Endpoints} */
routes(router)

/** set up middlewares */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', router)

/** start server */
app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
});