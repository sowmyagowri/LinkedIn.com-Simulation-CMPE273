import React, {Component} from 'react';
import '../../App.css';
import '../../jobsearch_wrapper.css';
import Navbar from '../NavBar/Navbar';
import { reduxForm } from "redux-form";
import { withRouter} from 'react-router-dom';
import { connect } from "react-redux";
import { userConstants } from '../../constants';
import { getsavedjobs } from '../../Actions/actions_jobs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class ViewSavedJobs extends Component{
    constructor(props){
        super(props);
        this.state = {
          count : 0, //GET COUNT OF SAVED JOBS
          jobs : []
        };
    }

    componentDidMount() {
        //call to action
        const applicantEmail = JSON.parse(localStorage.getItem(userConstants.USER_DETAILS)).email
        const token =  JSON.parse(localStorage.getItem(userConstants.AUTH_TOKEN));
        this.props.getsavedjobs(applicantEmail, token).then(response => {
            console.log("response:", response);
            if(response.payload.status === 200){
                var savedjobs = response.payload.data.allSavedJobs
                this.setState({
                    jobs : savedjobs,
                    count : savedjobs.length   
                })
            }
        })
    }

    normalapplyjob = (event, job) => {
        var applyjob = JSON.stringify(job)
        var id = JSON.parse(applyjob)._id
        window.open('/applyjob/'+id, "_blank")
        localStorage.setItem("job", applyjob)    
    }

    easyapplyjob = (event, job) => {
        var applyjob = JSON.stringify(job)
        var id = JSON.parse(applyjob)._id
        this.props.history.push({
            pathname:"/easyapply/"+id,
            state:{
                job : applyjob,
            }
        });
    }

    viewjob  = (event, job) => {
        console.log(job)
        this.props.history.push({
            pathname:`/job/view/${job._id}`,
            state:{
                viewjob : job,
            }
        });
    }
    
    getContents () {
        var rows = this.state.jobs;
        var self = this;
        if(rows.length > 0 && rows[0].hasOwnProperty('_id')) {
            return Object.keys(rows).map(function(i) {
              return <li className = "jobs-activity__list-item jobs-saved-jobs__list-item jobs-job-card-actions-container card-list__item job-card job-card--column ember-view" key={i}>
                    <div className = "media1">
                     <a href = {`/job/view/${rows[i]._id}`} className = "pull-left"><img alt=""src = {rows[i].company_logo} style = {{height : "50px", width : "50px"}}/></a>
                      <div className = "artdeco-entity-lockup--size-4 gap1">
                           <a href = {`/job/view/${rows[i]._id}`} onClick = {(event) => self.viewjob(event, rows[i])}><div className="job-details__subject1" >
                             {rows[i].title}
                            </div></a>
                        <div className="job-details__name">{rows[i].posted_by}</div>
                            <div className="job-details__location">
                             <FontAwesomeIcon className = "fa-map-marker-alt" icon="map-marker-alt">
                            </FontAwesomeIcon>&nbsp;&nbsp;{rows[i].location}</div>
                            <div className="job-details__posted">Expires on {rows[i].expiry_date}</div>
                        </div>  
                    </div>
                    {rows[i].application_method  === "Easy" ? 
                        <button type="submit" className="btn arteco-btn" style ={{width : "150px"}} onClick = {(event) => self.easyapplyjob(event, rows[i])}>Easy Apply</button> :
                        <button type="submit" className="btn arteco-btn" onClick = {(event) => self.normalapplyjob(event, rows[i])}>Apply</button>
                    }
            </li>
            })
        }
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

function mapStateToProps(state) {
    return {
        getsavedjobs: state.getsavedjobs
    }
}

export default withRouter(reduxForm({
    form: "View_Savedjobs"
    })(connect(mapStateToProps, { getsavedjobs}) (ViewSavedJobs)));