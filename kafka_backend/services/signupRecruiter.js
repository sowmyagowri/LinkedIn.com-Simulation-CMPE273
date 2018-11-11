const db = require('./../config/mysql');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { prepareInternalServerError, prepareSuccess, prepareResourceConflictFailure } = require('./responses')

async function handle_request(msg, callback) {
    console.log("Inside kafka sign up Recruiter backend");
    console.log("In handle request:" + JSON.stringify(msg));

    let email = msg.email;
    let password = msg.password;
    let first_name = msg.first_name;
    let last_name = msg.last_name;
    let resp = {};
    try {
        let hash = await bcrypt.hash(password, saltRounds);
        let post = {
            email: msg.email,
            password: hash,
            first_name: first_name,
            last_name: last_name
        }
        let result = await db.insertQuery('INSERT INTO recruiter_profile SET ?', post);
        let _id = result.insertId;
        resp = prepareSuccess({             
            email: post.email,
            // id: result.id,
            first_name: post.first_name,
            last_name: post.last_name
        });
    }
    catch (error) {
        if (error.errno === 1062) { //1062 is for primary key violation 
            console.log("Error: Email address already in use!");
            resp = prepareResourceConflictFailure({
                message: "Email address is already in use."
            });
        } else {
            console.log("Something went wrong during Recruiter signup! : ", error);
            //don't let time out occur, send internal server error
            resp = prepareInternalServerError();
        }
    }
    callback(null, resp);
}

module.exports = {
    handle_request: handle_request
}