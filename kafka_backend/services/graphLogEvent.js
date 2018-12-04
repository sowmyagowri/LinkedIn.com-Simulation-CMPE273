const db = require('../config/mysql');
const { prepareInternalServerError, prepareSuccess } = require('./responses')

async function handle_request(msg, callback) {
    console.log("Inside kafka get graph for log events backend");
    console.log("In handle request:" + JSON.stringify(msg));

    let email = msg.recruiterEmail;
    let job_id =  msg.jobID;
    let resp = {};
    try {
        let data = await db.selectQuery(
            'SELECT job_id, job_title, recruiter_email, event_name, COUNT(applicant_email) AS count FROM (SELECT job_id, job_title, recruiter_email, event_name, applicant_email FROM logging WHERE recruiter_email = ? and job_id = ?) AS t GROUP BY event_name',
            [ email, job_id ]
        );
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