var connection = new require('./kafka/Connection');
var { mongoose } = require('./config/mongoose');

//import kafka services
var signupRecruiterService = require('./services/signupRecruiter');
var signupApplicantService = require('./services/signupApplicant');
var postJobService = require('./services/postJob');
var signinRecruiterService = require('./services/signinRecruiter');
var getJobsByRecruiterService = require('./services/getJobsByRecruiter');
var postRecruiterProfileService = require('./services/postRecruiterProfile');
var getRecruiterProfileService = require('./services/getRecruiterProfile');
var editJobService =  require('./services/editJob');
var updateJobViewsService = require('./services/updateJobViews')

//import kafka topics
const {
    SIGNUP_RECRUITER_REQUEST_TOPIC, SIGNUP_APPLICANT_REQUEST_TOPIC, POST_JOB_REQUEST, 
    SIGNIN_RECRUITER_REQUEST_TOPIC,
    GET_JOBS_BY_RECRUITER_REQUEST, POST_RECRUITER_PROFILE_REQUEST,
    GET_RECRUITER_PROFILE_REQUEST, EDIT_JOB_REQUEST, UPDATE_JOB_VIEWS_REQUEST
} = require('./kafka/topics');

function handleTopicRequest(topic_name, fname) {
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('observing ', topic_name, 'for request');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name + " ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);

        fname.handle_request(data.data, function (err, res) {
            console.log('after handle' + res);
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (err, data) {
                console.log(data);
            });
            return;
        });

    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request

handleTopicRequest(SIGNUP_RECRUITER_REQUEST_TOPIC, signupRecruiterService);
handleTopicRequest(SIGNUP_APPLICANT_REQUEST_TOPIC, signupApplicantService);
handleTopicRequest(POST_JOB_REQUEST, postJobService);
handleTopicRequest(SIGNIN_RECRUITER_REQUEST_TOPIC, signinRecruiterService);
handleTopicRequest(GET_JOBS_BY_RECRUITER_REQUEST, getJobsByRecruiterService);
handleTopicRequest(POST_RECRUITER_PROFILE_REQUEST, postRecruiterProfileService);
handleTopicRequest(GET_RECRUITER_PROFILE_REQUEST, getRecruiterProfileService);
handleTopicRequest(EDIT_JOB_REQUEST, editJobService);
handleTopicRequest(UPDATE_JOB_VIEWS_REQUEST, updateJobViewsService);