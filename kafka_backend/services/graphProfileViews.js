var { Users } = require('../models/user');
const { prepareInternalServerError, prepareSuccess } = require('./responses')

async function handle_request(msg, callback) {
    console.log("Inside kafka get graph for profile views backend");
    console.log("In handle request:" + JSON.stringify(msg));

    let email = msg.email;
    let curr_month = new Date().getMonth();
    let resp = {};
    try {
        let data = await Users.find(
            { email : email },
            { profileViews : 1, _id : 0 }
        )
        var view_dict = {}
        var data_list = data[0].profileViews;
        
        for(var i = 0; i < data_list.length; i++){
            if(data_list[i].getMonth() == curr_month){
                if(data_list[i].getDate() in view_dict){
                    view_dict[data_list[i].getDate()] += 1;
                }
                else{
                    view_dict[data_list[i].getDate()] = 1;
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