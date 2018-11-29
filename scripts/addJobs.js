var addJob = require('../kafka_backend/services/postJob');
var { mongoose } = new require('../kafka_backend/config/mongoose');
var con = require('../kafka_backend/config/mysql')
con.startConnection()

function addJobs() {
    var recruiter_id = [
        '5bfcf161c4887a4415cd1be9', '5bfcf161c4887a4415cd1bea', '5bfcf215fa36bb441e5b2930', '5bfcf215fa36bb441e5b2931', '5bfcf215fa36bb441e5b2936',
        '5bfcf215fa36bb441e5b2935', '5bfcf215fa36bb441e5b2938', '5bfcf215fa36bb441e5b293c', '5bfcf215fa36bb441e5b293a', '5bfcf215fa36bb441e5b293d',
        '5bfcf215fa36bb441e5b2942', '5bfcf215fa36bb441e5b2940', '5bfcf215fa36bb441e5b293e', '5bfcf216fa36bb441e5b2946', '5bfcf216fa36bb441e5b2945'
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

    for (var i = 0; i < 10000; i++) {
        console.log("Created Job", i);
        var data = {
            recruiterID : recruiter_id[Math.floor(Math.random()*recruiter_id.length)],
            title : 'Title' + i.toString(),
            company : 'Company' + i.toString(),
            jobDescription : 'Job Description' + i.toString(),
            industry : 'Industry' + i.toString(),
            employmentType : employment_type_array[Math.floor(Math.random()*employment_type_array.length)],
            location : location_array[Math.floor(Math.random()*location_array.length)],
            jobFunction : 'Job Function' + i.toString(),
            companyLogo : 'https://logonoid.com/images/sjsu-logo.png',
            postedDate : posted_date_array[Math.floor(Math.random()*posted_date_array.length)],
            expiryDate : expiry_date_array[Math.floor(Math.random()*expiry_date_array.length)]
        }
        addJob.handle_request(data, function (res) {
            console.log("Result", res)
        })
    }
}

addJobs()