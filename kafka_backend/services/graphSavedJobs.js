var { Jobs } = require('../models/job');
const { prepareInternalServerError, prepareSuccess } = require('./responses')

async function handle_request(msg, callback) {
    console.log("Inside kafka get graph for saved jobs backend");
    console.log("In handle request:" + JSON.stringify(msg));

    let email = msg.email;
    let resp = {};
    try {
        let job_list = await Jobs.find(
            { posted_by: email },
            {
                _id: 1,
            }
        )
        resp = prepareSuccess({ "data": job_list });
    }
    catch (error) {
        console.log("Something went wrong while getting data! : ", error);
        //don't let time out occur, send internal server error
        resp = prepareInternalServerError();
    }
    callback(null, resp);
}

module.exports = {
    handle_request: handle_request
}