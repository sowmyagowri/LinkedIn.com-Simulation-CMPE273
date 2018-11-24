'use strict';
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var db = require('./../config/mysql');
var config = require('./../config');

// Setup work and export for the JWT passport strategy
module.exports =  function (passport) {
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: config.secret
    };
    passport.use(new JwtStrategy(opts, async function (jwt_payload, callback) {
        try{
            let result = null;
            if(jwt_payload.role === "applicant"){
                result = await db.selectQuery('SELECT email FROM applicant_profile WHERE email= ?', [jwt_payload.email]);
            }else{
                result = await db.selectQuery('SELECT email FROM recruiter_profile WHERE email= ?', [jwt_payload.email]);
            }
            if (result && result.length !== 0) {
                return callback(null, result);
            }else{
                console.log("The username or password you entered is incorrect.");
                return callback(null, false);
            }
        }catch(error){
            console.log("Error occured in passport: ", error);
            callback(err, false);
        }
    }));
};