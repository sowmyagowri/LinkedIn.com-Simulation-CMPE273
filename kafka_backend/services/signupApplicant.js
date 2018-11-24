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
            firstName: msg.firstname,
            lastName: msg.lastname
        }
        await db.insertQuery('INSERT INTO applicant_profile SET ?', post);
        var applicant = new Applicants({
            firstName : msg.firstname,
            lastName : msg.lastname,
            state : msg.state,
            zipcode : msg.zipcode,
            experience : [{
            title : msg.title,
            company : msg.company,
            location : msg.location,
            fromMonth: msg.fromMonth,
            fromYear: msg.fromYear,
            }],
            education : [{
                school : msg.school,
                degree : msg.degree,
                schoolfromYear: msg.schoolfromYear,
                schooltoYear: msg.schooltoYear,
            }],
            email: msg.email
        });
        console.log("applicant:", applicant);
        await applicant.save();
        resp = prepareSuccess({ 
            result: "Applicant Profile created Sucessfully",
            email: applicant.email,
            first_name: applicant.firstName,
            last_name: applicant.lastName,
            //role is needed to create JWT so that we can call appropriate SQL user table in passport
            role: "applicant"
         });
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