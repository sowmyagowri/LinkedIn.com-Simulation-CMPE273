const postJobController = require('../controller/postJobController')
module.exports = (router) => {
    /**
     * get all articles
     */
    router
        .route('/post_job/')
        .post(postJobController.postJob)
}