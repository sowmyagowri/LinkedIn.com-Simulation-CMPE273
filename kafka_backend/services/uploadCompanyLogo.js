var { Jobs } = require('../models/job');

function handle_request(msg, callback) {
    console.log("Company Logo:" + JSON.stringify(msg));
    console.log("Inside kafka upload company logo backend");

    var fileName = msg.file.originalname;
    var jobID = msg.jobID;
    Jobs.updateOne({_id : jobID}, { $set: {company_logo : fileName}}, function (err,res) {
        console.log("Upload Company Logo = ", res, err);
        callback(null, res)
    })
}

module.exports = {
    handle_request: handle_request
}