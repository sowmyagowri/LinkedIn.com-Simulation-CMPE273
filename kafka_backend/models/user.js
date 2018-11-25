var mongoose = require('mongoose');

var Users = mongoose.model('Users',{
    
    firstName : {
        type : String
    },
    lastName : {
        type : String
    },
    profilePicture : {
        type : String
    },
    profileSummary : {
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
    phoneNumber : {
        type: Number
    },
    address : {
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
        schoolfromYear: Number,
        schooltoYear: Number,
        description : String,
    }],
    skills : {
        type : String 
    },
    resume : {
        type : String,
        data : Buffer
    },
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