const db = require('../config/mysql');
const { prepareInternalServerError, prepareSuccess } = require('./responses')

async function handle_request(msg, callback) {
    console.log("Inside kafka get graph for log events backend");
    console.log("In handle request:" + JSON.stringify(msg));

    let email = msg.recruiterEmail;
    let resp = {};
    try {
        let data = await db.selectQuery('SELECT job_id, job_title, recruiter_email, event_name, COUNT(applicant_email) AS count FROM logging GROUP BY job_id, event_name HAVING recruiter_email = ?',[ email ]);
        resp = prepareSuccess({ "data": data });
    }
    catch (error) {
        console.log("Something went wrong while getting data! : ", error);
        //don't let time out occur, send internal server error
        resp = prepareInternalServerError();
    }
    callback(null, resp);
}

module.exports = {
    handle_request: handle_request
}