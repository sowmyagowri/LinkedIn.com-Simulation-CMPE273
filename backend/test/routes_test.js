var chai = require('chai');
var chaiHttp = require('chai-http');

chai.use(chaiHttp);

var expect = chai.expect;
var ROOT_URL = "http://ec2-18-224-229-134.us-east-2.compute.amazonaws.com:5000";

const cValue = "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWNjZXNzIjp0cnVlLCJtZXNzYWdlIjoiU3VjY2Vzc2Z1bCIsImVtYWlsIjoiZ3Nvd215YUBnbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJTb3dteWEiLCJsYXN0TmFtZSI6Ikdvd3Jpc2hhbmthciIsImlhdCI6MTU0MzkwMjAwNywiZXhwIjoxNTQzOTEyMDg3fQ._HeT2PJ6tXWl7GtfPL8keRdyF8TU6pTtX9upcP2H55w";

it("Should get logged in for Applicant with status code 200, success true and message Successful", function (done) {
    chai.request(ROOT_URL)
        .post('/signin_applicant')
        .send({ "email": "gsowmya@gmail.com", "password": "admin" })
        .end(function (err, res) {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.be.an('object');
            expect(res.body.success).to.be.true;
            expect(res.body.message).to.be.string;
            expect(res.body.message).to.equal('Successful');
            done();
        });
});

it("Should successfully return the profile of the applicant", function (done) {
    chai.request(ROOT_URL)
        .get('/get_applicant_profile/?email=gsowmya@gmail.com')
        .set('Authorization', cValue)
        .send()
        .end(function (err, res) {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.be.an('object');
            expect(res.body.success).to.be.true;
            expect(res.body.profile).to.be.an('object');
            expect(res.body.profile.email).to.be.string;
            expect(res.body.profile.email).to.equal("gsowmya@gmail.com");
            expect(res.body.profile.firstName).to.be.string;
            expect(res.body.profile.firstName).to.equal("Sowmya");
            expect(res.body.profile.role).to.be.string;
            expect(res.body.profile.role).to.equal("A");
            done();
        });
});

it("Should able to send Message to other applicant", function (done) {
    chai.request(ROOT_URL)
        .post('/message')
        .set('Authorization', cValue)
        .send({
            "receiver": {
                username: 'yash@gmail.com',
                firstname: 'Yash',
                lastname: 'Mahajan'
            },
            "message" : "Hey from Mocha Test Case"
        })
        .end(function (err, res) {
            expect(res).to.have.status(200);
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.be.an('object');
            expect(res.body.success).to.be.true;
            done();
        });
});

it("Should able to create new applicant user", function(done){
    chai.request(ROOT_URL)
    .post('/signup_applicant/')
    .send({ firstname: "Mocha", lastname : "TestCase", email:"mochaTestCase@gmail.com", password: "admin"})
    .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        expect(res.body.success).to.be.true;
        expect(res.body.message).to.be.string;
        expect(res.body.message).to.equal('Successful');
        done();
    });
});

it("Should able to delete applicant user", function(done){
    chai.request(ROOT_URL)
    .delete('/delete_profile/?email=mochaTestCase@gmail.com')
    .set('Authorization', cValue)
    .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        expect(res.body.success).to.be.true;
        expect(res.body.message).to.be.string;
        expect(res.body.message).to.equal('Successful');
        done();
    });
});


