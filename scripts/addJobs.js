var addJob = require('../kafka_backend/services/postJob');
var { mongoose } = new require('../kafka_backend/config/mongoose');
var con = require('../kafka_backend/config/mysql')
con.startConnection()

function addJobs() {
    var recruiter_email = [
        'recruiter1@gmail.com', 'recruiter2@gmail.com', 'recruiter3@gmail.com', 'recruiter4@gmail.com'
    ]

    var location_array = [
        'San Jose', 'Chicago', 'New York', 'San Francisco'
    ]

    var posted_date_array = [
        '2018-12-01', '2018-11-23', '2018-11-30', '2018-10-31', '2018-11-15'
    ]

    var expiry_date_array = [
        '2019-01-10', '2019-01-23', '2019-02-13', '2019-01-31', '2019-02-15'
    ]

    var employment_type_array = [
        'Full Time', 'Internship'
    ]

    var application_methods = [
        'Easy', 'Normal'
    ] 

    for (var i = 2; i < 100; i++) {
        console.log("Created Job", i);
        var data = {
            recruiterEmail : 'akhilesh.anand@sjsu.edu',
            title : 'Title' + i.toString(),
            company : 'Company' + i.toString(),
            jobDescription : 'Job Description' + i.toString(),
            industry : 'Industry' + i.toString(),
            employmentType : employment_type_array[Math.floor(Math.random()*employment_type_array.length)],
            location : location_array[Math.floor(Math.random()*location_array.length)],
            jobFunction : 'Job Function' + i.toString(),
            companyLogo : 'https://logonoid.com/images/sjsu-logo.png',
            postedDate : posted_date_array[Math.floor(Math.random()*posted_date_array.length)],
            expiryDate : expiry_date_array[Math.floor(Math.random()*expiry_date_array.length)],
            applicationMethod : application_methods[Math.floor(Math.random()*application_methods.length)]
        }
        addJob.handle_request(data, function (res) {
            console.log("Result", res)
        })
    }
}

addJobs()