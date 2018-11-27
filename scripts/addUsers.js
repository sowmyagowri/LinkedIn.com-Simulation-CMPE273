var addUser = require('../kafka_backend/services/signupApplicant');
var { mongoose } = new require('../kafka_backend/config/mongoose');
var con = require('../kafka_backend/config/mysql')
con.startConnection()

function addUsers() {
    for (var i = 500; i < 1000; i++) {
        console.log("Created User", i);
        var data = {
            firstname: 'User' + i.toString(),
            lastname: 'UserLastname' + i.toString(),
            email: 'useremail' + i.toString() + '@gmail.com',
            password: '1234'
        }
        addUser.handle_request(data, function (res) {
            console.log("Result", res)
        })
    }
}

addUsers()