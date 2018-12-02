const { prepareInternalServerError, prepareSuccess } = require('./responses')
const { Users } = require('./../models/user');

async function handle_request(req, callback) {
    let resp = {};
    // let offset = req.start ? parseInt(req.start) : 0 ;
    // let length = req.length ? parseInt(req.length) : 100 ;
    try {
        let people = await Users.find(prepareQuery(req));
        resp = prepareSuccess({people});
    } catch (error) {
        console.log(error);
        resp = prepareInternalServerError()
    }
    callback(null, resp);
}

function prepareQuery(request) {
    let query = {};
    console.log(request);
    if (request.search) {
        query = {
            $or : [
                {firstName : { $regex:  request.search, $options: "i" }},
                {lastName : { $regex:  request.search, $options: "i" }}
            ]
        }
    }
    console.log(query);
    return query;
    
}

exports.handle_request = handle_request;