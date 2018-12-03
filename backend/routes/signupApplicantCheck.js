const express = require("express");
const kafka = require('./../kafka/client');
const { SIGNUP_APPLICANT_CHECK_REQUEST_TOPIC, SIGNUP_APPLICANT_CHECK_RESPONSE_TOPIC } = require('./../kafka/topics');
const { responseHandler, sendInternalServerError, sendBadRequest } = require('./response');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('./../config');

/**
 *  this script will be called for routes begin with /signup_applicant_check
 *  
 *  below "/" is relative resource path, the actual resource path is /signup_applicant_check/
 * 
 */
router.post("/", (req, res) => {
    console.log("Inside Applicant Sign Up Check Route req:", req.body);
    let errors = validateInput(req);
    if (errors) {
        let msg = errors.map(error => error.msg).reduce((accumulator, currentVal) => accumulator + "\n" + currentVal);
        sendBadRequest(res, {
            detail: msg
        });
    }
    else {
        kafka.make_request(SIGNUP_APPLICANT_CHECK_REQUEST_TOPIC, SIGNUP_APPLICANT_CHECK_RESPONSE_TOPIC, req.body, function (err, result) {
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
    req.checkBody("email", "An Email address is required.").notEmpty();

    //add more validation if needed.
    return req.validationErrors();
}

module.exports = router;