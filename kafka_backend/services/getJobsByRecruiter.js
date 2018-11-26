var { Jobs } = require('../models/job');
const { prepareInternalServerError, prepareSuccess } = require('./responses');
const {redisClient} = require('./../config/redisClient')

async function handle_request(msg, callback) {
    console.log("In handle request:" + JSON.stringify(msg));
    console.log("Inside kafka get jobs by recruiter backend");

    let resp = {};
    try {
        var recruiter_id = msg.recruiterID;
        let redisKey = "jobsByRecruiter_" + recruiter_id;
        redisClient.get(redisKey, async function (err, job_list) {
            if (!err && job_list != null) {
                console.log("Get job_list : job_list found in cache");
                //console.log(job_list);
                job_list = JSON.parse(job_list);
            } else {
                console.log("Get job_list : inserting job_list into cache");
                //Main Logic for fetching jobs by recruiter
                job_list = await Jobs.find({ 'posted_by': recruiter_id }, { title: 1, company: 1, job_description: 1, industry: 1, employment_type: 1, location: 1, job_function: 1, company_logo: 1, posted_date: 1, expiry_date: 1 });
                /**********/
                if (job_list) {
                    redisClient.set(redisKey, JSON.stringify(job_list), function (error, reply) {
                        if (error) {
                            console.log(error);
                        }
                        console.log(reply);
                    });
                    //cache will expire in 30 secs
                    redisClient.expire(redisKey, 30);
                }
            }
            resp = prepareSuccess({ "allJobs": job_list });
            callback(null, resp);
        });
    } catch (err) {
        console.log("Error: ", err);
        resp = prepareInternalServerError();
        callback(null, resp);
    }
}

module.exports = {
    handle_request: handle_request
}