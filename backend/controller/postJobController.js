var kafka = require('./kafka/client');

function postJob(req, res) {
    console.log("Inside Post Job controller");
    console.log("POSTJOB: ", req.body);
    kafka.make_request('post_job_request',req.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("Inside else");
            res.json(results);
            res.end();
        }
        
    });
}

module.exports = {
    postJob: postJob
}