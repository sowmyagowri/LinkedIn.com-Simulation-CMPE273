var { Jobs } = require('../models/job');
const { prepareInternalServerError, prepareSuccess } = require('./responses')

async function handle_request(msg, callback) {
    console.log("Inside kafka get graph for clicks per job backend");
    console.log("In handle request:" + JSON.stringify(msg));

    let _id = msg.recruiterID;
    let resp = {};
    try {
        let data = await Jobs.find({ 'posted_by': _id }, { title: 1, no_of_clicks: 1 })
        labels = []
        values = []
        for(var i = 0; i < data.length; i++){
            labels.push(data[i].title)
            values.push(data[i].no_of_clicks)
        }
        resp = prepareSuccess({ "labels": labels, "values": values });
    }
    catch (error) {
        console.log("Something went wrong while acquiring data! : ", error);
        //don't let time out occur, send internal server error
        resp = prepareInternalServerError();
    }
    callback(null, resp);
}

module.exports = {
    handle_request: handle_request
}