const signupRecruiterController = require('../controller/signupRecruiterController')
module.exports = (router) => {
    /**
     * get all articles
     */
    router
        .route('/signup_recruiter/')
        .post(signupRecruiterController.signupRecruiter)
}