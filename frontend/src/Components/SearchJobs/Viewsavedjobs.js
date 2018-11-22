import React, {Component} from 'react';
import '../../App.css';
import '../../jobsearch_wrapper.css';
import Navbar from '../NavBar/Navbar';
import { Field, reduxForm } from "redux-form";
import {Redirect, withRouter} from 'react-router-dom';
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class ViewSavedJobs extends Component{
    constructor(props){
        super(props);
        this.state = {
          count : 2, //GET COUNT OF SAVED JOBS
          jobs : [
            {
            id : 1,
            posted_by : "CISCO",
            title : "Security and Incident Manager" ,
            job_description : "Upwork1 is the world's largest freelancing website. Each year $1.5 billion of work happens through Upwork, allowing businesses to get more done and helping professionals break free of traditional time and place boundaries and work anytime, anywhere on projects they love. At Upwork, you'll help build on this momentum. Together, well create economic and social value on a global scale, providing a trusted online workplace for businesses to connect with extraordinary talent and work without limits.Are you a superstar security defender? Would you like to work with advanced tools and lead a team? We can use your skills and experience to defend against sophisticated attacks and keep our platform secure. We need your disciplined, methodical approach towards incident response and security investigations. \n\n Upwork1 is the world's largest freelancing website. Each year $1.5 billion of work happens through Upwork, allowing businesses to get more done and helping professionals break free of traditional time and place boundaries and work anytime, anywhere on projects they love. At Upwork, you'll help build on this momentum. Together, well create economic and social value on a global scale, providing a trusted online workplace for businesses to connect with extraordinary talent and work without limits.Are you a superstar security defender? Would you like to work with advanced tools and lead a team? We can use your skills and experience to defend against sophisticated attacks and keep our platform secure. We need your disciplined, methodical approach towards incident response and security investigations",
           industry : "industry",
           employment_type : "fulltime",
           location : "Sanjose",
           job_function : "adadawdfw",
           company_logo : "/images/cisco.png",
           posted_date : "ssdsd",
           expiry_date : "sdfcsdf" },
           {
            id : 2,
            posted_by : "APPLE",
            title : "Security and Incident Manager" ,
            job_description : "Upwork1 is the world's largest freelancing website. Each year $1.5 billion of work happens through Upwork, allowing businesses to get more done and helping professionals break free of traditional time and place boundaries and work anytime, anywhere on projects they love. At Upwork, you'll help build on this momentum. Together, well create economic and social value on a global scale, providing a trusted online workplace for businesses to connect with extraordinary talent and work without limits.Are you a superstar security defender? Would you like to work with advanced tools and lead a team? We can use your skills and experience to defend against sophisticated attacks and keep our platform secure. We need your disciplined, methodical approach towards incident response and security investigations. \n\n Upwork1 is the world's largest freelancing website. Each year $1.5 billion of work happens through Upwork, allowing businesses to get more done and helping professionals break free of traditional time and place boundaries and work anytime, anywhere on projects they love. At Upwork, you'll help build on this momentum. Together, well create economic and social value on a global scale, providing a trusted online workplace for businesses to connect with extraordinary talent and work without limits.Are you a superstar security defender? Would you like to work with advanced tools and lead a team? We can use your skills and experience to defend against sophisticated attacks and keep our platform secure. We need your disciplined, methodical approach towards incident response and security investigations",
           industry : "industry",
           employment_type : "fulltime",
           location : "Sanjose",
           job_function : "adadawdfw",
           company_logo : "/images/cisco.png",
           posted_date : "ssdsd",
           expiry_date : "sdfcsdf" }]
        };
    }

    getContents () {
        var rows = this.state.jobs;

        if(rows.length > 0 && rows[0].hasOwnProperty('id')) {
            return Object.keys(rows).map(function(i) {
              return <li className = "jobs-activity__list-item jobs-saved-jobs__list-item jobs-job-card-actions-container card-list__item job-card job-card--column ember-view" key={i}>
                    <div className = "media1">
                     <a href = {`/jobs/view/${rows[i].id}`} className = "pull-left"><img src = {rows[i].company_logo} style = {{height : "50px", width : "50px"}}/></a>
                      <div className = "artdeco-entity-lockup--size-4 gap1">
                           <a href = {`/jobs/view/${rows[i].id}`}><div className="job-details__subject1" >
                             {rows[i].title}
                            </div></a>
                        <div className="job-details__name">{rows[i].posted_by}</div>
                            <div className="job-details__location">
                             <FontAwesomeIcon className = "fa-map-marker-alt" icon="map-marker-alt">
                            </FontAwesomeIcon>&nbsp;&nbsp;{rows[i].location}</div>
                            <div className="job-details__posted">Posted on {rows[i].posted_date}</div>
                        </div>  
                    </div>
                    <button type="submit" className="btn arteco-btn pull-right">Apply</button>
            </li>
            })
        }
    }

    componentDidMount() {
        //call to action
    }
    

    render() {
        return (
            <div className="jobsearch-wrapper">
                <Navbar></Navbar>
                <div className="neptune-grid2 two-column full-height" style={{ marginTop: "70px" }}>
                    <div className="core-rail jobs-box jobs-box--full-width">
                        <h2 className="jobs-activity__header jobs-box__title jobs-box__content-wrap">
                            <span className="list-title">Saved jobs &nbsp;({this.state.count})</span></h2>
                        <ul className="jobs-saved-jobs__list card-list card-list--column jobs-activity__list">
                            <div>
                                {this.getContents()}
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewSavedJobs;