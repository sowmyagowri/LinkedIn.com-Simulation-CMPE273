var { Jobs } = require('../models/job');

async function handle_request(msg, callback) {
    console.log("Company Logo:" + JSON.stringify(msg));
    console.log("Inside kafka upload company logo backend");

    var fileName = msg.file.originalname;
    var jobID = msg.jobID;
    let resp = {};
    try {
        let res = await Jobs.updateOne({ _id: jobID }, { $set: { company_logo: fileName } });
        resp = prepareSuccess(res);
    } catch (err) {
        console.log("Error: " , err);
        resp = prepareInternalServerError();
    }
    callback(null, resp);
}

module.exports = {
    handle_request: handle_request
}