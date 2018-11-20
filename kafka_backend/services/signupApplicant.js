const db = require('./../config/mysql');
var { Applicants } = require('../models/applicant');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { prepareInternalServerError, prepareSuccess, prepareResourceConflictFailure } = require('./responses')

async function handle_request(msg, callback) {
    console.log("Inside kafka sign up applicant backend");
    console.log("In handle request:" + JSON.stringify(msg));

    let resp = {};
    try {
        let hash = await bcrypt.hash(msg.password, saltRounds);
        let post = {
            email: msg.email,
            password: hash,
            first_name: msg.first_name,
            last_name: msg.last_name
        }
        await db.insertQuery('INSERT INTO applicant_profile SET ?', post);
        var applicant = new Applicants({
            
        });
        await applicant.save();
        resp = prepareSuccess({ "result": "Applicant Profile created Sucessfully" });
    }
    catch (error) {
        if (error.errno === 1062) { //1062 is for primary key violation 
            console.log("Error: Email address already in use!");
            resp = prepareResourceConflictFailure({
                message: "Email address is already in use."
            });
        } else {
            console.log("Something went wrong during Applicant signup! : ", error);
            //don't let time out occur, send internal server error
            resp = prepareInternalServerError();
        }
    }
    callback(null, resp);
}

module.exports = {
    handle_request: handle_request
}