var { Jobs } = require('../models/job');

function handle_request(msg, callback) {
    console.log("In handle request:" + JSON.stringify(msg));
    console.log("Inside kafka post job backend");

    var jobs = new Jobs({
        posted_by : msg.recruiterID,
        title : msg.title,
        job_description : msg.jobDescription,
        industry : msg.industry,
        employment_type : msg.employmentType,
        location : msg.location,
        job_function : msg.jobFunction,
        company_logo : msg.companyLogo,
        posted_date : msg.postedDate,
        expiry_date : msg.expiryDate
    });

    jobs.save().then((job) => {
        console.log("Property Inserted : ", job);
        callback(null,{ "jobID": job._id });
    }, (err) => {
        console.log("Error Inserting Job", err);
    })
}

module.exports = {
    handle_request: handle_request
}