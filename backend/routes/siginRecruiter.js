const signinRecruiterController = require('../controller/signinRecruiterController')
module.exports = (router) => {
    /**
     * get all articles
     */
    router
        .route('/signin_recruiter/')
        .post(signinRecruiterController.signinRecruiter)
}