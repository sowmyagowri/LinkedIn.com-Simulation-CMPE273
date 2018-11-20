const express = require("express");
const kafka = require('./../kafka/client');
const { SIGNUP_APPLICANT_REQUEST_TOPIC, SIGNUP_APPLICANT_RESPONSE_TOPIC } = require('./../kafka/topics');
const { responseHandler, sendInternalServerError, sendBadRequest } = require('./response');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('./../config');

/**
 *  this script will be called for routes begin with /signup_applicant
 *  
 *  below "/" is relative resource path, the actual resource path is /signup_applicant/
 * 
 */
router.post("/", (req, res) => {
    console.log("Inside Applicant Sign Up Route req:", req.body);
    let errors = validateInput(req);
    if (errors) {
        let msg = errors.map(error => error.msg).reduce((accumulator, currentVal) => accumulator + "\n" + currentVal);
        sendBadRequest(res, {
            detail: msg
        });
    }
    else {
        kafka.make_request(SIGNUP_APPLICANT_REQUEST_TOPIC, SIGNUP_APPLICANT_RESPONSE_TOPIC, req.body, function (err, result) {
            if (err) {
                // called in case of time out error, or if we failed to send data over kafka
                sendInternalServerError(res);
            } else {
                if(result.code === 200){
                    var token = jwt.sign(result.data, config.secret, {
                        expiresIn: 10080 // in seconds
                    });
                    result.data.token = 'JWT ' + token;
                }
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
    req.checkBody("email", "An Email address is required.").notEmpty();
    req.checkBody("password", "A Password is required.").notEmpty();
    //req.checkBody("password", "Your Password must contain at least 1 number and 1 letter. \n Your Password must be between 7 and 32 characters.").matches(/^(?=.*\d)(?=.*[a-zA-Z]).{7,32}$/);
    req.checkBody("firstname", "First name is required").notEmpty();
    req.checkBody("lastname", "Last name is required").notEmpty();

    //add more validation if needed.
    return req.validationErrors();
}

module.exports = router;