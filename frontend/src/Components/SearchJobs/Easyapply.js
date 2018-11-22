import React, {Component} from 'react';
import '../../App.css';
import '../../jobsearch_wrapper.css';
import './Easyapply.css';
import '../NavBar/Navbar.css';
import { Field, reduxForm } from "redux-form";
import {Redirect, withRouter} from 'react-router-dom';
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Easyapply extends Component{
    constructor(props){
        super(props);
        this.state = {
          profile : [
            {
            firstname : "Vince",
            lastname : "Daniel",
            location : "San Jose",
            headline : "Student of San Jose University",
            title : "Security and Incident Manager" ,
            emailaddress : "saranya@gmail.com",
            }]
        };
    }


    componentDidMount() {
        //call to action
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
                                <img src ="/images/cisco.png" style = {{width:"70px", height: "70px"}} />
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
                            <figure><img src = "/images/avatar.png" /></figure>
                            <dl>
                                <dt className = "profile-name">{profile[0].firstname}&nbsp;{profile[0].lastname} </dt>
                                <dd className = "profile-headline">{profile[0].headline}</dd>
                            </dl>
                            </div>
                        </section>
                        <section className = "section-profile ember-view" style = {{marginTop : "30px"}}>
                        <div className = "profile-title" style = {{fontSize : "19px"}}>Contact Info</div>
                            <li className = "job-question ember-view">
                                <label htmlFor = "phone-number-question" className = "question-apply">Phone Number</label>
                                <input className = "form-control" id="phone-number-question"  pattern="[0-9]{10}" placeholder="1234567890" type="number"/>
                               <label htmlFor = "email-question" className = "question-apply">Email Address</label>
                                <input className = "form-control" id="email-question" placeholder="email address" type="email"/>
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

export default Easyapply;