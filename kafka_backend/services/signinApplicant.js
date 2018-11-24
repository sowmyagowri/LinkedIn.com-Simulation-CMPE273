var db = require('./../config/mysql');
var bcrypt = require('bcrypt');
const { prepareInternalServerError, prepareSuccess, prepareAuthenticationFailure } = require('./responses');

async function handle_request(msg, callback) {
    console.log("Inside kafka sign in Recuiter backend");
    console.log("In handle request:" + JSON.stringify(msg));

    var email = msg.email;
    let resp = {};
    try {
        let result = await db.selectQuery('SELECT * FROM applicant_profile WHERE email= ?', [email]);
        let match = false;
        let user = {};
        if (result && result.length !== 0) {
            user = result[0];
            match = await bcrypt.compare(msg.password, user.password);
        }
        if (match) {
            resp = prepareSuccess({
                email: user.email,
                first_name: user.firstname,
                last_name: user.lastname,
                //role is needed to create JWT so that we can call appropriate SQL user table in passport
                role: "applicant"
            });
        } else {
            resp = prepareAuthenticationFailure({
                result: "Invalid username or password"
            });
        }

    } catch (e) {
        console.log("Error: ", e);
        resp = prepareInternalServerError();
    }
    callback(null, resp);
}

module.exports = {
    handle_request: handle_request
}