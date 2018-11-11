// server/app.js

/** require dependencies */
uploadCompanyLogo =  require('./controller/uploadCompanyLogo').uploadCompanyLogo
const express = require("express")
const routes = require('./routes')
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');
const app = express()
app.use(cookieParser());
const router = express.Router()
var passport = require('passport');
app.use(passport.initialize());
const multer = require('multer');
const uuidv4 = require('uuid/v4');

let port = 5000 || process.env.PORT

/** set up routes {API Endpoints} */
routes(router)

/** set up middlewares */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', router)

const storageCompanyLogo = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../static/companyLogo');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const uploadSingle = multer({
    storage: storageCompanyLogo
});

app.post('/upload_company_logo/', uploadSingle.single('company_logo'), (req, res) => {
    var jobID = req.body.jobID;
    console.log("files in uploadSingle", req.file);
    uploadCompanyLogo(jobID, req.file)
})


/** start server */
app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
});