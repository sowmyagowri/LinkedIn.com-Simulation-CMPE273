var connection =  new require('./kafka/Connection');
var {mongoose} = require('./config/mongoose');
//topics files
var signupRecruiter = require('./services/signupRecruiter');
var postJob = require('./services/postJob');
var signinRecruiter = require('./services/signinRecruiter');
var uploadCompanyLogo = require('./services/uploadCompanyLogo')

function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("signup_recruiter_request",signupRecruiter)
handleTopicRequest("post_job_request",postJob)
handleTopicRequest("signin_recruiter_request",signinRecruiter)
handleTopicRequest("upload_company_logo_request",uploadCompanyLogo)
