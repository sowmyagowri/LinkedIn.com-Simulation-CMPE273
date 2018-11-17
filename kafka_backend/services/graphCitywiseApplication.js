var { Jobs } = require('../models/job');
const { prepareInternalServerError, prepareSuccess } = require('./responses')

async function handle_request(msg, callback) {
    console.log("Inside kafka get graph for city wise jobs per month backend");
    console.log("In handle request:" + JSON.stringify(msg));

    let _id = msg.recruiterID;
    let req_month = parseInt(msg.month);
    let resp = {};
    try {
        let data = await Jobs.find(
            { 'posted_by': _id }, { title: 1, applications: 1 }
        )
        total_jobs_dict = {}
        for (var i = 0; i < data.length; i++) {
            let job_dict = {}
            for (var j = 0; j < data[i].applications.length; j++) {
                let curr_application = JSON.parse(JSON.stringify(data[i].applications[j]))
                if (curr_application && curr_application.date && (new Date(curr_application.date)).getMonth() + 1 == req_month) {
                    if(curr_application.city in job_dict){
                        job_dict[curr_application.city] += 1
                    }
                    else{
                        job_dict[curr_application.city] = 1
                    }
                }
            }
            job_key = data[i].title + "_" + data[i]._id
            total_jobs_dict[job_key] = job_dict
        }
 
        resp = prepareSuccess({ "data": total_jobs_dict });
    }
    catch (error) {
        console.log("Something went wrong while acquiring data! : ", error);
        //don't let time out occur, send internal server error
        resp = prepareInternalServerError();
    }
    callback(null, resp);
}

module.exports = {
    handle_request: handle_request
}