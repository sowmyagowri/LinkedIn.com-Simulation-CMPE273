var getApplicantProfileService = require('./../../kafka_backend/services/getApplicantProfile');
const { GET_APPLICANT_PROFILE_REQUEST } = require('./../kafka/topics');
var { mongoose } = new require('./../../kafka_backend//config/mongoose');
const topicToServiceMap = {
    [GET_APPLICANT_PROFILE_REQUEST]:  getApplicantProfileService,
    //add topic: service here to bypass kafka
}

function byPassKafka(topic, msg_payload, callback){
    topicToServiceMap[topic].handle_request(msg_payload, callback);
}

module.exports={
    byPassKafka
}