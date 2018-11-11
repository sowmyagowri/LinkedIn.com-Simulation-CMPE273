var db = require('./../config/mysql');
var bcrypt = require('bcrypt');

function handle_request(msg, callback) {
    console.log("Inside kafka sign in Recuiter backend");
    console.log("In handle request:" + JSON.stringify(msg));

    var email = msg.email;
    db.selectQuery('SELECT id, first_name, last_name, email, password FROM recruiter_profile WHERE email= ?', [email], function (e, result){
    //     // console.log("Result:", result)
        if(e){
            console.log("Something went wrong during Recruiter signin!")
        }
        else if(result && result.length == 0){
            callback(null, { success: false, result : "Wrong Email"});
        }
        else{
            var email = result[0]['email'];
            var password = result[0]['password'];
            var id = result[0]['id'];
            var first_name = result[0]['first_name'];
            var last_name = result[0]['last_name'];
            bcrypt.compare(msg.password, password, function (err, result){
                if(result == false){
                    callback(null, { success: false, result : "Wrong Password" })
                }
                else{
                    var data = {
                        success: true,
                        email:email,
                        id:id,
                        first_name:first_name,
                        last_name:last_name
                    }
                    callback(null, data)
                }
            })
        }
    });
}

module.exports = {
    handle_request: handle_request
}