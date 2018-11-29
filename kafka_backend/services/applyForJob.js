var { Jobs } = require('../models/job');
var { Users } = require('../models/user');
const { prepareInternalServerError, prepareSuccess } = require('./responses');

async function handle_request(msg, callback) {
    console.log("In handle request:" + JSON.stringify(msg));
    console.log("Inside kafka apply for job backend");

    let resp = {};
    try {
        var application = {
            applicant_email: msg.body.applicantEmail,
            first_name: msg.body.firstName,
            last_name: msg.body.lastName,
            address: msg.body.address,
            phone_number: msg.body.phoneNumber,
            how_did_they_hear_about_us: msg.body.howDidTheyHearAboutUs,
            diversity_question: msg.body.disabilityQuestion,
            sponsorship_question: msg.body.sponsorshipQuestion,
            disability_question: msg.body.disabilityQuestion,
            resume: msg.resumeName,
            cover_letter: msg.coverletterName,
        }
        console.log("jobID - ", msg.body.jobID);
        console.log("Email - ", msg.body.applicantEmail);
        await Jobs.updateOne(
            { _id : msg.body.jobID },
            {
                $push: { applications : application }
            }
        );

        await Users.updateOne(
            { email : msg.body.applicantEmail },
            {
                $push: { jobsAppliedTo : msg.body.jobID }
            }
        );

        await Users.updateOne(
            { email : msg.body.applicantEmail },
            {
                $pull : { savedJobs : msg.body.jobID }
            }
        );
        resp = prepareSuccess({ "result" : "Applied to job successfully!" });
    } catch (err) {
        console.log("Error: " , err);
        resp = prepareInternalServerError();
    }
    callback(null, resp);
}

module.exports = {
    handle_request: handle_request
}