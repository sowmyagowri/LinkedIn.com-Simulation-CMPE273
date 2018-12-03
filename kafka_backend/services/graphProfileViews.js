var { Users } = require('../models/user');
const { prepareInternalServerError, prepareSuccess } = require('./responses')
const Moment = require('moment');
const MomentRange = require('moment-range');

const moment = MomentRange.extendMoment(Moment);


async function handle_request(msg, callback) {
    console.log("Inside kafka get graph for profile views backend");
    console.log("In handle request:" + JSON.stringify(msg));

    let email = msg.email;
    let limit_date = new Date((new Date().getTime() - (30 * 24 * 60 * 60 * 1000) - (8 * 60 * 60000)));
    console.log("Date:", limit_date)
    let curr_date = new Date(new Date().getTime() - 8 * 60 * 60000);
    console.log("Today's date:", curr_date);
    const range = moment.range(limit_date, curr_date);

    let resp = {};
    try {
        let data = await Users.find(
            { email: email },
            {
                profileViews: 1,
                _id: 0
            }
        )
        console.log("Data - ", data);
        var view_dict = {};
        if (data && data[0]) {
            var data_list = data[0].profileViews;
            for (var i = 0; i < data_list.length; i++) {
                if (range.contains(data_list[i])) {
                    if (data_list[i].getDate() in view_dict) {
                        view_dict[data_list[i].getDate()] += 1;
                    }
                    else {
                        view_dict[data_list[i].getDate()] = 1;
                    }
                }
            }
        }
        resp = prepareSuccess({ "data": view_dict });
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