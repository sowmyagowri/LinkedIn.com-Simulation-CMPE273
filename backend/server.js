/** require dependencies */
const express = require("express");
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

let signupRecruiter = require('./routes/signupRecruiter')
let addRecruiterRole = require('./routes/addRecruiterRole');
let signupApplicant = require('./routes/signupApplicant');
let signinRecruiter = require('./routes/signinRecruiter');
let signinApplicant = require('./routes/signinApplicant');
let postJob = require('./routes/postJob');
let getJobsByRecruiter = require('./routes/getJobsByRecruiter');
let postRecruiterProfile = require('./routes/postRecruiterProfile');
let getRecruiterProfile = require('./routes/getRecruiterProfile');

let getApplicantProfile = require('./routes/getApplicantProfile');
let postApplicantProfileSummary = require('./routes/postApplicantProfilesummary');

let editJob = require('./routes/editJob');
let updateJobViews = require('./routes/updateJobViews');
let graphClicksPerJob = require('./routes/graphClicksPerJob');
let graphTopJobPostings = require('./routes/graphTopJobPostings');
let updateJobClicks = require('./routes/updateJobClicks');
let graphUnpopularJobPostings = require('./routes/graphUnpopularJobPostings');
let graphCitywiseApplication = require('./routes/graphCitywiseApplication');
let logEvent = require('./routes/logEvent');
let graphLogEvent = require('./routes/graphLogEvent');
let sendMessage = require('./routes/sendMessage');
let getAllMessages = require('./routes/getAllMessages');

let expressValidator = require("express-validator");
var morgan = require('morgan');
let cors = require('cors');
const config = require('./config');
const app = express()
app.use(cookieParser());
let passport = require('passport');
app.use(passport.initialize());
require('./passport/passport')(passport);
let requireAuth = passport.authenticate('jwt', {session: false});

const multer = require('multer');

let port = 5000 || process.env.PORT


/** set up middlewares */

app.use(cors({ origin: `http://${config.frontend_host_port}`, credentials: true }));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', `http://${config.frontend_host_port}`);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

app.use(expressValidator());
app.use(morgan('dev'));

// define routes
app.use("/signup_recruiter/", signupRecruiter);
app.use("/signup_applicant/", signupApplicant);
app.use("/signin_recruiter/", signinRecruiter);
app.use("/signin_applicant/", signinApplicant);

// Add routes above this line if they do not require passport authentication
// Add passport Authentication code will go here
app.use("/", requireAuth);
// Add routes below this line if they require passport authentication

app.use("/add_recruiter_role/", addRecruiterRole);
app.use("/post_job/", postJob);
app.use("/get_jobs_by_recruiter/", getJobsByRecruiter);
app.use("/post_recruiter_profile/", postRecruiterProfile);
app.use("/get_recruiter_profile/", getRecruiterProfile);

app.use("/get_applicant_profile/", getApplicantProfile);
app.use("/post_applicant_profile_summary/", postApplicantProfileSummary);

app.use("/edit_job/", editJob);
app.use("/update_job_views/", updateJobViews);
app.use("/graph_clicks_per_job/", graphClicksPerJob);
app.use("/graph_top_job_postings/", graphTopJobPostings);
app.use("/update_job_clicks/", updateJobClicks);
app.use("/graph_unpopular_job_postings/", graphUnpopularJobPostings);
app.use("/graph_citywise_applications/", graphCitywiseApplication);
app.use("/log_event/", logEvent);
app.use("/graph_log_event/", graphLogEvent);
app.use("/message", sendMessage);
app.use("/messages", getAllMessages);
/** start server */
app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
});