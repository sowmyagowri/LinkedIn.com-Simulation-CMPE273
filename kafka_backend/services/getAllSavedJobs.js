var { Users } = require('../models/user');
const { prepareInternalServerError, prepareSuccess } = require('./responses');

async function handle_request(msg, callback) {
    console.log("In handle request:" + JSON.stringify(msg));
    console.log("Inside kafka get all saved jobs backend");

    let resp = {};
    try {
        var applicant_email = msg.applicantEmail;
        let job_list = await Users.find(
            { email : applicant_email },
            {
                savedJobs : 1,
                _id : 0
            }
        );
        resp = prepareSuccess({ "allSavedJobs": job_list[0] });
    } catch (err) {
        console.log("Error: ", err);
        resp = prepareInternalServerError();
    }
    callback(null, resp);
}

module.exports = {
    handle_request: handle_request
}