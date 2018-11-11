// server/routes/index.js
const siginRecruiter = require('./siginRecruiter')
const signupRecruiter = require('./signupRecruiter')
const postJob = require('./postJob')

module.exports = (router) => {
    siginRecruiter(router),
    signupRecruiter(router),
    postJob(router)
}