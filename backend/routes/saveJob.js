const express = require("express");
const kafka = require('./../kafka/client');
const { SAVE_JOB_REQUEST, SAVE_JOB_RESPONSE } = require('./../kafka/topics');
const { responseHandler, sendInternalServerError, sendBadRequest } = require('./response');
const router = express.Router();

/**
 *  this script will be called for routes begin with /post_job
 *  
 *  below "/" is relative resource path, the actual resource path is /post_job/
 * 
 */
router.post("/", (req, res) => {
    console.log("Inside Save Job controller");
    console.log("SAVE JOB: ", req.body);
    let errors = validateInput(req);
    if (errors) {
        let msg = errors.map(error => error.msg).reduce((accumulator, currentVal) => accumulator + "\n" + currentVal);
        sendBadRequest(res, {
            detail: msg
        });
    }
    else {
        kafka.make_request(SAVE_JOB_REQUEST, SAVE_JOB_RESPONSE, req.body, function (err, result) {
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
    // req.checkBody("title", "Job Title is required.").notEmpty();
    // req.checkBody("jobDescription", "Job Description is required.").notEmpty();

    //add more validation if needed.
    return req.validationErrors();
}

module.exports = router;
