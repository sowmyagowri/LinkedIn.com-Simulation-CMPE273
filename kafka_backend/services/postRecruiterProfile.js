const db = require('./../config/mysql');
const { prepareInternalServerError, prepareSuccess } = require('./responses')

async function handle_request(msg, callback) {
    console.log("Inside kafka post Recruiter profile backend");
    console.log("In handle request:" + JSON.stringify(msg));

    let id = parseInt(msg.recruiterID);
    let address = msg.address;
    let city = msg.city;
    let state = msg.state;
    let zipcode = msg.zipcode;
    let phone_number = msg.phoneNumber;
    let company = msg.company;
    let resp = {};
    try {
        await db.updateQuery('UPDATE recruiter_profile SET address = ?, city = ?, state = ?, zipcode = ?, company = ?, phone_number = ?  WHERE id = ?', [address, city, state, zipcode, company, phone_number, id]);
        resp = prepareSuccess({ "result": "Profile Updated Sucessfully" });
    }
    catch (error) {
        console.log("Something went wrong while inserting profile! : ", error);
        //don't let time out occur, send internal server error
        resp = prepareInternalServerError();
    }
    callback(null, resp);
}

module.exports = {
    handle_request: handle_request
}