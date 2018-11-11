var kafka = require('./kafka/client');

function uploadCompanyLogo(jobID, file) {
    console.log("Inside upload company logo controller");
    console.log("UPLOADCOMPANYLOGO: ", jobID, file);
    var data = {jobID:jobID, file:file};
    kafka.make_request('upload_company_logo_request',data, function(err,res){
        console.log('in result');
        console.log(res);
        if (err){
            console.log("Inside err");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("Inside else");
            return res;
        }
        
    });
}

module.exports = {
    uploadCompanyLogo: uploadCompanyLogo
}