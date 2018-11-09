// server/routes/index.js
const siginRecruiter = require('./siginRecruiter')
const signupRecruiter = require('./signupRecruiter')

module.exports = (router) => {
    siginRecruiter(router),
    signupRecruiter(router)
}