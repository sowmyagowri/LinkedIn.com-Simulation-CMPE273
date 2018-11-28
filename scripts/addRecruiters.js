var addRecruiter = require('../kafka_backend/services/signupRecruiter');
var { mongoose } = new require('../kafka_backend/config/mongoose');
var con = require('../kafka_backend/config/mysql')
con.startConnection()

function addRecruiters() {
    for (var i = 0; i < 10000; i++) {
        console.log("Created Recruiter", i);
        var data = {
            firstname: 'Recruiter' + i.toString(),
            lastname: 'RecruiterLastname' + i.toString(),
            email: 'recruiteremail' + i.toString() + '@gmail.com',
            password: '1234'
        }
        addRecruiter.handle_request(data, function (res) {
            console.log("Result", res)
        })
    }
}

addRecruiters()