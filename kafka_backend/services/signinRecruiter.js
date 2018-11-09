var db = require('./../config/mysql');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var passport = require('passport');
// require('../config/passport')(passport);

function handle_request(msg, callback) {
    console.log("Inside kafka sign in Recuiter backend");
    console.log("In handle request:" + JSON.stringify(msg));

    var email = msg.email;
    // db.selectQuery('SELECT id, email, password, type FROM users WHERE email= ?', [email], function (e, result){
    //     // console.log("Result:", result)
    //     if(result.length == 0){
    //         return res.end(JSON.stringify({"result": "Wrong Email"}));
    //     }
    //     else if(result[0]['type'] != req.body.person_type){
    //         return res.end(JSON.stringify({"result": "Invalid " + req.body.person_type + " login!"}));
    //     }
    //     else{
    //         var email = result[0]['email'];
    //         var password = result[0]['password'];
    //         var id = result[0]['id'];
    //         bcrypt.compare(req.body.password, password, function (err, result){
    //             if(result == false){
    //                 return res.end(JSON.stringify({"result": "Wrong Password"}));
    //             }
    //             else{
    //                 res.cookie('cookie',req.body.email,{maxAge: 900000, httpOnly: false, path : '/'});
    //                 req.session.user = req.body.email;
    //                 res.writeHead(200,{
    //                     'Content-Type' : 'application/json'
    //                 });
    //                 res.end(JSON.stringify({"id":id}));
    //             }
    //         })
    //     }
    // });
}

module.exports = {
    handle_request: handle_request
}