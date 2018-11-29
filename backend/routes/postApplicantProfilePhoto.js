const express = require("express");
const kafka = require('./../kafka/client');
const { POST_APPLICANT_PROFILE_PHOTO_REQUEST, POST_APPLICANT_PROFILE_PHOTO_RESPONSE } = require('./../kafka/topics');
const { responseHandler, sendInternalServerError, sendBadRequest } = require('./response');
const router = express.Router();

const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './profilepictures');
  },
  filename: (req, file, callback) => {
    fileExtension = file.originalname.split('.')[1] // get file extension from original file
    callback(null, file.originalname.split('.')[0] + '-' + Date.now() + '.' + fileExtension);
  },
});
var upload = multer({ storage : storage })

/**
 *  this script will be called for routes begin with /post_job
 *  
 *  below "/" is relative resource path, the actual resource path is /post_job/
 * 
 */

router.post("/", upload.any(), function(req,res){

    var filename;
    req.files.map(file => {
        filename = file.filename;
    });
    console.log(filename);

    // var stringObj = JSON.stringify(filenamearray);
    // console.log(stringObj);
    // console.log("In Owner Property Post");

    console.log("Inside post applicant Profile Picture controller");
    console.log("POST APPLICANT PROFILE PICTURE: ", req.body);
    const data = {
        email : req.body.email,
        profilePicture : filename
    }
    let errors = validateInput(req);
    if (errors) {
        let msg = errors.map(error => error.msg).reduce((accumulator, currentVal) => accumulator + "\n" + currentVal);
        sendBadRequest(res, {
            detail: msg
        });
    }
    else {
        kafka.make_request(POST_APPLICANT_PROFILE_PHOTO_REQUEST, POST_APPLICANT_PROFILE_PHOTO_RESPONSE, data, function (err, result) {
            if (err) {
                // called in case of time out error, or if we failed to send data over kafka
                sendInternalServerError(res);
            } else {
                responseHandler(res, result);
            }
        });
    }
});


/**
 * 
 * returns false if there is no validation error, otherwise returns array of error messages.
 * for more detail on handling error with express-validator check https://github.com/chriso/validator.js/
 *  
 * @param {object} req - express request object 
 */

function validateInput(req) {
    // req.checkBody("company", "A Company name is required.").notEmpty();
    // req.checkBody("phone_number", "A Phone Number is required.").notEmpty();
    // req.checkBody("password", "Your Password must contain at least 1 number and 1 letter. \n Your Password must be between 7 and 32 characters.").matches(/^(?=.*\d)(?=.*[a-zA-Z]).{7,32}$/);

    //add more validation if needed.
    return req.validationErrors();
}

module.exports = router;