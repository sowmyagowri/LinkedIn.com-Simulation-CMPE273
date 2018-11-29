import React, {Component} from 'react';
import '../../App.css';
import '../../jobsearch_wrapper.css';
import './Easyapply.css';
import '../NavBar/Navbar.css';
import { reduxForm } from "redux-form";
import { withRouter} from 'react-router-dom';
import { connect } from "react-redux";
import { userConstants } from '../../constants';
import { getapplicantprofile } from '../../Actions/applicant_login_profile_actions';

class Easyapply extends Component{
    constructor(props){
        super(props);
        this.state = {
          profile : []
        };
    }


    componentDidMount() {
        //call to action
        const data = JSON.parse(localStorage.getItem(userConstants.USER_DETAILS)).email;
        console.log(localStorage.getItem(userConstants.USER_DETAILS));
        this.props.getapplicantprofile(data, localStorage.getItem(userConstants.AUTH_TOKEN)).then(response => {
            console.log("response:", response);
            if(response.payload.status === 200){
                this.setState({ 
                        profile: response.payload.data.profile,
                        isLoading : false
                });                
            }
                this.refs.myphonenumber.value = this.state.profile.phonenumber
                this.refs.myemail.value = this.state.profile.email;
        })
    }
    

    render() {
        const profile = this.state.profile;
        return (
           <div className="jobsearch-wrapper">
                <div className="navbar fixed-top navbar-dark bg-dark" style={{ height: "52px" }}>
                    <div className="home_wrapper">
                        <div className="nav-main__content full-height display-flex align-items-center" role="navigation">
                            <h1 className ="easy-apply-h1"><a className="navbar-brand" href="#"><img src={"/images/linkedin-logo2.png"} alt="" />&nbsp;Easy Apply</a></h1>
                        </div> 
                    </div>
                </div>
                <div id ="container-easyapply">
                    <div className ="wrapping-header" >
                        <div className ="easyapply-header">
                            <div className ="company-logo">
                                <img src ="/images/cisco.png" alt="" style = {{width:"70px", height: "70px"}} />
                            </div>
                            <div className ="company-info-wrapper">
                                <div className ="company-info">
                                    <div className = "job-title">Security Engineer
                                    </div>
                                    <div className = "company-name">APPLE
                                    </div>
                                    <div className = "location-description">Mountain View
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
                            <figure><img alt="" src = "/images/avatar.png" /></figure>
                            <dl>
                                <dt className = "profile-name">{profile.firstname}&nbsp;{profile.lastname} </dt>
                                <dd className = "profile-headline">{profile.profileSummary}</dd>
                            </dl>
                            </div>
                        </section>
                        <section className = "section-profile ember-view" style = {{marginTop : "30px"}}>
                        <div className = "profile-title" style = {{fontSize : "19px"}}>Contact Info</div>
                            <li className = "job-question ember-view">
                                <label htmlFor = "phone-number-question" className = "question-apply">Phone Number</label>
                                <input className = "form-control" id="phone-number-question" ref ="myphonenumber"  pattern="[0-9]{10}" placeholder="1234567890" type="number"/>
                               <label htmlFor = "email-question" className = "question-apply">Email Address</label>
                                <input className = "form-control" id="email-question" ref = "myemail" placeholder="email address" type="email"/>
                            </li>
                        </section>
                        <section className = "section-profile ember-view" style = {{marginTop : "30px"}}>
                        <div className = "profile-title" style = {{fontSize : "19px"}}>Resume</div>
                           
                        <div className = "job-application-consents ember-view">We include a copy of your full profile with your application
                        <br></br>
                        We’ll save your answers to questions that tend to be common across applications so you can use them later. 
                        </div>
                        </section>
                        <button className = "btn arteco-btn" type = "submit">Submit</button>
                    </div>    
                </div>
        </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        getapplicantprofile: state.getapplicantprofile
    }
}

export default withRouter(reduxForm({
    form: "Easy_Apply"
    })(connect(mapStateToProps, { getapplicantprofile}) (Easyapply)));