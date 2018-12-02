const express = require("express");
const kafka = require('./../kafka/client');
const { GET_APPLICANT_PROFILE_REQUEST, GET_APPLICANT_PROFILE_RESPONSE } = require('./../kafka/topics');
const { responseHandler, sendInternalServerError, sendBadRequest } = require('./response');
const router = express.Router();

router.get("/", (req, res) => {
    console.log("Inside get applicant Profile controller");
    console.log("GETAPPLICANTPROFILE: ", req.query);
    let errors = validateInput(req);
    if (errors) {
        let msg = errors.map(error => error.msg).reduce((accumulator, currentVal) => accumulator + "\n" + currentVal);
        sendBadRequest(res, {
            detail: msg
        });
    }
    else {
        kafka.make_request(GET_APPLICANT_PROFILE_REQUEST, GET_APPLICANT_PROFILE_RESPONSE, req.query, function (err, result) {
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
