var getJobsByRecruiterService = require('./../../kafka_backend/services/getJobsByRecruiter');
var signinRecruiter = require('./../../kafka_backend/services/signinRecruiter');
var signinApplicant = require('./../../kafka_backend/services/signinApplicant');
const { GET_JOBS_BY_RECRUITER_REQUEST, SIGNIN_RECRUITER_REQUEST_TOPIC, SIGNIN_APPLICANT_REQUEST_TOPIC } = require('./../kafka/topics');
var { mongoose } = new require('./../../kafka_backend//config/mongoose');
const topicToServiceMap = {
    [GET_JOBS_BY_RECRUITER_REQUEST]:  getJobsByRecruiterService,
    [SIGNIN_RECRUITER_REQUEST_TOPIC]: signinRecruiter,
    [SIGNIN_APPLICANT_REQUEST_TOPIC]: signinApplicant,
    //add topic: service here to bypass kafka
}

function byPassKafka(topic, msg_payload, callback){
    topicToServiceMap[topic].handle_request(msg_payload, callback);
}

module.exports={
    byPassKafka
}