var mongoose = require('mongoose');

var Applicants = mongoose.model('Applicants',{
    firstName : {
        type : String
    },
    lastName : {
        type : String
    },
    state : {
        type: String
    },
    zipcode : {
        type: String
    },
    experience : [{
        title : String,
        company : String,
        location : String,
        fromMonth: String,
        fromYear: Number,
    }],
    education : [{
        school : String,
        degree : String,
        fromYear: Number,
        toYear: Number,
    }],
    email: String
});

module.exports = {Applicants};