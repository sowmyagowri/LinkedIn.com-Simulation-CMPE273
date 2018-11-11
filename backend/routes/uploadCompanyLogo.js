let express = require("express");
const { sendBadRequest, sendInternalServerError, responseHandler } = require('./response');
const kafka = require('./../kafka/client');
const {
   UPLOAD_COMPANY_LOGO_REQUEST, UPLOAD_COMPANY_LOGO_RESPONSE
} = require('./../kafka/topics');
let router = express.Router();
let multer = require("multer");
const path = require("path");

//const config = require('./../config');

let storage = multer.diskStorage({
    destination: function (req, file, callbk) {
        console.log("path ---> ", path.join(__dirname, "../../static/companyLogo"));

        callbk(null, path.join(__dirname, "../../static/companyLogo"))
    },
    filename: function (req, file, callbk) {
        
        callbk(null, req.jobID + "_CompanyLogo_" + new Date().toISOString()
            ((file.mimetype === 'image/jpeg') ? ".jpeg" : (file.mimetype === 'image/png') ? ".png" : ""));
    }
});

function fileFilter(req, file, callbk) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        callbk(null, true);
    } else {
        callbk(null, false);
    }
}

let upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})


router.post("/", upload.single('profilePhoto'), function (req, res) {
    let jobID = req.body.jobID;
    let file = req.file;
    console.log("files in uploadSingle", req.file);
    let errors = validateInput(req);
    if (errors) {
        let msg = errors.map(error => error.msg).reduce((accumulator, currentVal) => accumulator + "\n" + currentVal);
        sendBadRequest(res, {
            detail: msg
        });
    } else {
        kafka.make_request(UPLOAD_COMPANY_LOGO_REQUEST, UPLOAD_COMPANY_LOGO_RESPONSE, 
            {jobID, file}
            , function (err, result) {
            if (err) {
                sendInternalServerError(res);
            } else {
                responseHandler(res, result);
            }
        });
    }
});

function validateInput(req) {
    // if (req.file !== undefined) {
    //     req.body.profilefilepath = `http://${config.backend_host}:${config.backend_port}/companyLogo/` + req.file.filename;
    //     console.log("new profile ----> ",req.body.profilefilepath);
    // }

    //add validation here

    let errors = req.validationErrors();
    return errors;
}

module.exports = router;




