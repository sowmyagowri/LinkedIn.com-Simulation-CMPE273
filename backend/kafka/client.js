var rpc = require('./kafkarpc');
const rpcConnections ={}

/**
 * make request to kafka
 * 
 * @param {string} req_queue_name - request topic name
 * @param {string} resp_queue_name - response topic name
 * @param {object} msg_payload - data to be sent over the request topic
 * @param {function} callback - callback funtion to be executed upon success or failure of the kafka request
 */
function make_request(req_queue_name, resp_queue_name, msg_payload, callback) {
	if(rpcConnections[req_queue_name+"_"+resp_queue_name] === undefined){
		// making sure only one instance per request response topic combination exist.
		rpcConnections[req_queue_name+"_"+resp_queue_name] = new rpc() ;
	}
	console.log('in make request');
	console.log(msg_payload);
	rpcConnections[req_queue_name+"_"+resp_queue_name].makeRequest(req_queue_name, resp_queue_name, msg_payload, function (err, response) {

		if (err) {
			console.error(err);
			callback(err, null);
		} else {
			console.log("response", response);
			callback(null, response);
		}
	});
}

exports.make_request = make_request;