import React, {Component} from 'react';
import '../../App.css';
import '../../jobsearch_wrapper.css';
import './Easyapply.css';
import '../NavBar/Navbar.css';
import { reduxForm } from "redux-form";
import { withRouter} from 'react-router-dom';
import { connect } from "react-redux";
import URI from '../../constants/URI';
import { userConstants } from '../../constants';
import { getapplicantprofile } from '../../Actions/applicant_login_profile_actions';
import { applyjob } from '../../Actions/actions_jobs';


class Easyapply extends Component{
    constructor(props){
        super(props);
        this.state = {
          profile : [],
          jobdetails :[],
          firstname : "",
          lastname : "",
          phonenumber : "",
          profilephoto : "",
          address : "",
          resume : "",
          touchedprofile : {
            firstname: false,
            lastname: false,
            phonenumber : false,
            address : false,
          }
        };

        this.submitApply = this.submitApply.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.uploadresume = this.uploadresume.bind(this)
    }


    componentDidMount() {
        //call to action
        const data = JSON.parse(localStorage.getItem(userConstants.USER_DETAILS)).email;
        const token =  JSON.parse(localStorage.getItem(userConstants.AUTH_TOKEN));
        this.props.getapplicantprofile(data, token).then(response => {
            console.log("response:", response);
            if(response.payload.status === 200){
                this.setState({ 
                        profile: response.payload.data.profile,
                        firstname : response.payload.data.profile.firstName,
                        lastname : response.payload.data.profile.lastName,
                        phonenumber : response.payload.data.profile.phoneNumber === undefined || null || ""  ? "" : response.payload.data.profile.phoneNumber,
                        email : response.payload.data.profile.email,
                        resume : response.payload.data.profile.resume,
                        address : response.payload.data.profile.address,
                        profilephoto : response.payload.data.profile.profilePicture === "" ? "images/avatar.png" : response.payload.data.profile.profilePicture,
                        isLoading : false,
                        jobdetails : JSON.parse(this.props.location.state.job)
                }); 
                this.refs.myfirstname.value = response.payload.data.profile.firstName      
                this.refs.mylastname.value = response.payload.data.profile.lastName  
                this.refs.myphonenumber.value = response.payload.data.profile.phoneNumber      
                this.refs.myemail.value = response.payload.data.profile.email
                this.refs.myaddress.value = response.payload.data.profile.address
            }
        })
    }

    openResumeDialog = (e) => {
        document.getElementById('resume').click();
    }

    uploadresume = (event) => {
        event.preventDefault();
        var file = event.target.files[0]
        console.log(file)

        this.setState ({
            resume : file.name,
            uploadedresume : file
        })
    }
    
    changeHandler = (e) => {
        const state = {
          ...this.state,
          [e.target.name]: e.target.value,
          }

        this.setState(state);
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touchedprofile: { ...this.state.touchedprofile, [field]: true }
        });
    }

    handleValidation () {
        let formIsValid = false;
        const errors = validateprofile(this.state.firstname, this.state.lastname, this.state.phonenumber, this.state.resume, this.state.address);
        if(!errors.firstname && !errors.lastname && !errors.lastname && !errors.phonenumber && !errors.resume && !errors.address){
          formIsValid = true
        }
        return formIsValid;
    }

    submitApply = () => {
        if (this.handleValidation()) {
            const token =  JSON.parse(localStorage.getItem(userConstants.AUTH_TOKEN));
            const data = {
                first_name : this.state.firstname,
                last_name : this.state.lastname,
                applicant_email : this.state.email,
                phone_number : this.state.phonenumber,
                resume : this.state.resume,
                address : this.state.address
            }

            // var formData = new FormData();
            // formData.append('uploadedFile', this.state.uploadedresume);
            
            // Object.keys(data).forEach(function(key){
            //     formData.append(key, data[key]);
            // });

            // // Display the formdata key/value pairs
            // for (var pair of formData.entries()) {
            //     console.log(pair[0]+ ', ' + pair[1]); 
            // }

            this.props.applyjob(data, token).then(response => {
                console.log("response:", response);
                if(response.payload.status === 200){
                    console.log("Applied job Successfully")
                    window.location.href = '/searchjobs';
                }
             })
            }
    } 

    render() {
        const {profile, jobdetails} = this.state;
        const {isLoading} = this.state;
        if(!isLoading){
            const errors = validateprofile(this.state.firstname, this.state.lastname, this.state.phonenumber, this.state.resume, this.state.address);
            var shouldMarkError = (field) => {
                const hasError = errors[field];
                const shouldShow = this.state.touchedprofile[field];
                return hasError ? shouldShow : false;
            };
        }
        return (
           <div className="jobsearch-wrapper">
                <div className="navbar fixed-top navbar-dark bg-dark" style={{ height: "52px" }}>
                    <div className="home_wrapper">
                        <div className="nav-main__content full-height display-flex align-items-center" role="navigation">
                            <h1 className ="easy-apply-h1"><a className="navbar-brand" href="/"><img src={"/images/linkedin-logo2.png"} alt="" />&nbsp;Easy Apply</a></h1>
                        </div> 
                    </div>
                </div>
                <div id ="container-easyapply">
                    <div className ="wrapping-header" >
                        <div className ="easyapply-header">
                            <div className ="company-logo">
                                <img src ={jobdetails.company_logo} alt="" style = {{width:"70px", height: "70px"}} />
                            </div>
                            <div className ="company-info-wrapper">
                                <div className ="company-info">
                                    <div className = "job-title">{jobdetails.title}
                                    </div>
                                    <div className = "company-name">{jobdetails.company}
                                    </div>
                                    <div className = "location-description">{jobdetails.location}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className = "artdeco-scrolling-container">
                    <div className = "artdeco-tabpanel">
                        <section className = "section-profile ember-view">
                            <div className = "profile-title">LinkedIn profile</div>
                            <div className = "profile-entity">
                            <figure>
                                {this.state.profilephoto === "/images/avatar.png" ?
                                <img alt="" src = "/images/avatar.png" /> : 
                                <img src = {URI.ROOT_URL + "/profilepictures/" + this.state.profilephoto} alt="" />}
                            </figure>
                            <dl>
                                <dt className = "profile-name">{profile.firstName}&nbsp;{profile.lastName} </dt>
                                <dd className = "profile-headline">{profile.profileSummary}</dd>
                            </dl>
                            </div>
                        </section>
                        <section className = "section-profile ember-view" style = {{marginTop : "30px"}}>
                        <div className = "profile-title" style = {{fontSize : "19px"}}>Contact Info</div>
                            <li className = "job-question ember-view">
                                <div className="row form-group">
                                    <div className = "col-xs-6 col-md-6">
                                        <label htmlFor="position-firstname-typeahead" className="mb1 required">First Name*</label>
                                        <input className = "form-control" name = "firstname" ref = "myfirstname" onChange = {this.changeHandler} onBlur={this.handleBlur('firstname')} id="position-firstname-typeahead" maxLength="100" type="text"/>
                                    </div>
                                    <div className = "col-xs-6 col-md-6">
                                        <label htmlFor="position-lastname-typeahead" className="mb1 required">Last Name*</label>
                                        <input className = "form-control"  name = "lastname" ref = "mylastname" onChange = {this.changeHandler} onBlur={this.handleBlur('lastname')} id="position-lastname-typeahead" maxLength="100" type="text"/>
                                    </div>
                                    {!isLoading ?
                                        <div className = "col-xs-6 col-md-6">
                                        {shouldMarkError('firstname') ? <div className=""  style = {{color: "red"}}>First Name is a required field</div> : (null)}
                                        </div> : (null)
                                    }
                                    {!isLoading ?
                                        <div className = "col-xs-6 col-md-6">
                                        {shouldMarkError('lastname') ? <div className=""  style = {{color: "red"}}>Last Name is a required field</div> : (null)}
                                        </div> : (null)
                                    }
                                </div>
                                <div>
                                    <label htmlFor = "email-question" className = "question-apply">Email Address*</label>
                                    <input className = "form-control" name = "email" id="email-question" ref = "myemail" maxLength="100" type="email" disabled/>
                                </div>
                                <div>
                                    <label htmlFor = "address-question" className = "question-apply">Address*</label>
                                    <input className = "form-control" name = "address" id="address-question" ref ="myaddress" onChange = {this.changeHandler} type="text" onBlur={this.handleBlur('address')} placeholder="Address"/>
                                    
                                    {!isLoading ?
                                    <div className = "col-xs-12">
                                     {shouldMarkError('address') ? <div className=""  style = {{color: "red"}}>Address is a required field</div> : (null)}
                                    </div> : (null) }
                                 </div>
                                <div>
                                    <label htmlFor = "phone-number-question" className = "question-apply">Phone Number*</label>
                                    <input className = "form-control" name = "phonenumber" id="phone-number-question" ref ="myphonenumber" onChange = {this.changeHandler} type="text" pattern="[0-9]{10}" onBlur={this.handleBlur('phonenumber')} placeholder="1234567890"/>
                                    
                                    {!isLoading ?
                                    <div className = "col-xs-12">
                                     {shouldMarkError('phonenumber') ? <div className=""  style = {{color: "red"}}>Phone Number is a required field</div> : (null)}
                                    </div> : (null) }
                                </div>
                            </li>
                        </section>
                        <section className = "section-profile ember-view">
                        <div className = "profile-title" style = {{fontSize : "19px"}}>Resume</div>
                            <div className="form-group">
                                <input type="file" id="resume" onChange={this.uploadresume} style = {{display : "none"}}/>
                                <button type="file" className="btn arteco-btn-save" id="position-resume-typeahead" onClick = {this.openResumeDialog} style = {{width : "150px"}}>Upload Resume
                                </button>&nbsp;&nbsp;{this.state.resume} 
                            </div> 
                        <div className = "job-application-consents ember-view">We include a copy of your full profile with your application
                        <br></br>
                        We’ll save your answers to questions that tend to be common across applications so you can use them later. 
                        </div>
                        </section>
                        <button className = "btn arteco-btn" type = "submit"  style = {{marginBottom : "100px"}} onClick = {this.submitApply}>Submit</button>
                    </div>    
                </div>
        </div>
        )
    }
}

function validateprofile(firstname, lastname, phonenumber, resume, address) {
    // true means invalid, so our conditions got reversed
    return {
      firstname: firstname.length === 0, 
      lastname: lastname.length === 0,
      phonenumber: phonenumber.length !== 10,
      resume: resume.length === 0,
      address : address.length === 0
    };
}

function mapStateToProps(state) {
    return {
        getapplicantprofile: state.getapplicantprofile,
        applyjob : state.applyjob
    }
}

export default withRouter(reduxForm({
    form: "Easy_Apply"
    })(connect(mapStateToProps, { getapplicantprofile, applyjob}) (Easyapply)));