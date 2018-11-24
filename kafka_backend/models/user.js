var mongoose = require('mongoose');

var Users = mongoose.model('Users',{
    firstName : {
        type : String
    },
    lastName : {
        type : String
    },
    email : {
        type : String
    },
    state : {
        type: String
    },
    zipcode : {
        type: String
    },
    role : {
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
    connectionsIncoming:[{
        email : String,
    }],
    connectionsOutgoing:[{
        email : String,
    }],
    connectionsApproved:[{
        email : String,
    }],
});

module.exports = {Users};