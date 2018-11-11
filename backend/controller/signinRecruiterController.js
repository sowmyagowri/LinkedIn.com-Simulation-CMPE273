var kafka = require('./kafka/client');
var jwt = require('jsonwebtoken');
var config = require('../../kafka_backend/config/mysql');

function signinRecruiter(req, res) {
    console.log("Inside sign in Recruiter controller");
    console.log("SIGNIN: ", req.body);
    kafka.make_request('signin_recruiter_request',req.body, function(err,results){
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
            var final_result;
            if (results.success == true) {
                var token_user = {
                    email: results.email,
                    id: results.id
                }
                var token = jwt.sign(token_user, config.secret, {
                    expiresIn: 10080
                })
                final_result = { success: true, token: 'JWT ' + token, recruiter_id : results.id, recruiter_email: results.email, recruiter_first_name: results.first_name, recruiter_last_name: results.last_name }
            }
            else{
                final_result = results.result
            }
            res.json(final_result);
            res.end();
        }
        
    });
}

module.exports = {
    signinRecruiter: signinRecruiter
}