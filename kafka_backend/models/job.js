var mongoose = require('mongoose');

var Jobs = mongoose.model('Jobs',{
    posted_by : {
        type : String
    },
    title : {
        type : String
    },
    job_description : {
        type : String
    },
   industry : {
       type: String
   },
   employment_type : {
       type : String
   },
   location : {
       type : String
   },
   job_function : {
       type : String
   },
   company_logo : {
       type : String
   },
   posted_date : {
       type : Date
   },
   expiry_date : {
       type : Date
   },
   no_of_views : {
       type : Number
   },
   no_of_clicks : {
       type : Number
   },
   applications : [{
       applicant_id : {
           type : String
       },
       first_name : {
           type : String
       },
       last_name : {
           type : String
       },
       address : {
           type : String
       },
       how_did_they_hear_about_us : {
           type : String
       },
       diversity_question : {
           type : String
       },
       sponsorship_question : {
            type : String
       },
       disability_question : {
           type : String
       },
       resume : {
           type : String,
           data : Buffer
       },
       cover_letter : {
           type : String,
           data : Buffer
       }
   }]
});

module.exports = {Jobs};