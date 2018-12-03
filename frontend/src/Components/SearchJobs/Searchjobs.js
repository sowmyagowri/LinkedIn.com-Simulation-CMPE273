import React, {Component} from 'react';
import '../../App.css';
import '../../jobsearch_wrapper.css';
import Navbar from '../NavBar/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import URI from '../../constants/URI';
import { reduxForm } from "redux-form";
import { withRouter} from 'react-router-dom';
import { connect } from "react-redux";
import { userConstants } from '../../constants';
import { searchjob, logjobclicks } from '../../Actions/actions_jobs';

class SearchJobs extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentjoblistid : 1,
            search : "",
            location : "",
            company : "",
            date_posted : "",
            employment_type : "",
            jobdata : [],
            results : true
        };
        this.openJob = this.openJob.bind(this);
        this.normalapplyjob = this.normalapplyjob.bind(this);
        this.easyapplyjob = this.easyapplyjob.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
    }


    changeHandler = (e) => {
        const state = {
          ...this.state,
          [e.target.name]: e.target.value,
          }

        this.setState(state);
    }

    openJob(id) {
        this.setState({
            currentjoblistid: id,
        });
    };

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
        const token =  JSON.parse(localStorage.getItem(userConstants.AUTH_TOKEN));
        const data = {
            jobID: job._id
        }
        this.props.logjobclicks(data, token).then(response => {
            console.log("response:", response);
            if(response.payload.status === 200){
                console.log("Job Clicks updated successfully")
            }
        })
        this.props.history.push({
            pathname:`/job/view/${job._id}`,
            state: {
                viewjob : job,
            }
        });
    }

    componentDidMount() {
        //call to action

        var data = { 
            start : 0,
            length : 100,
            search : this.props.location.state === undefined || this.props.location.state.jobname === undefined ? "" : this.props.location.state.jobname,
            company : "",
            employment_type : "",
            location : this.props.location.state === undefined || this.props.location.state.location === undefined ? "" : this.props.location.state.location,
            date_posted : ""
        }

        const token =  JSON.parse(localStorage.getItem(userConstants.AUTH_TOKEN));

        this.props.searchjob(data, token).then(response => {
            console.log("response:", response);
            if(response.payload.status === 200){
                if(response.payload.data.jobs.length > 0) {
                this.setState({ 
                    jobdata : response.payload.data.jobs,
                    currentjoblistid : response.payload.data.jobs[0]._id,
                    search : this.props.location.state === undefined || this.props.location.state.jobname === undefined? "" : this.props.location.state.jobname,
                    location : this.props.location.state === undefined || this.props.location.state.location === undefined ? "" : this.props.location.state.location,
                    results : true
                })
            } else {
                this.setState({ 
                    results : false
                })
            }
            }
        })
    }

    onSearch = () => {
        var data = { 
            start : 0,
            length : 100,
            search : this.state.search,
            company : this.state.company,
            employment_type : this.state.employment_type,
            location : this.state.location,
            date_posted : this.state.date_posted
        }

        console.log(data)

        const token =  JSON.parse(localStorage.getItem(userConstants.AUTH_TOKEN));

        this.props.searchjob(data, token).then(response => {
            console.log("response:", response);
            if(response.payload.status === 200){
                var results = response.payload.data.jobs.length > 0
                console.log(results)
                if(results){
                    this.setState({ 
                        jobdata : response.payload.data.jobs,
                        currentjoblistid : response.payload.data.jobs[0]._id,
                        results : results
                    })
                } else {
                    this.setState({ 
                        results : results
                    })
                }
            }
        })
    }

    render(){
        if(this.state.results){
            var currentjobliststate = this.state.jobdata.find(x => x._id === this.state.currentjoblistid);
        }
        return (
            <div className="jobsearch-wrapper">
                <Navbar></Navbar>
                {this.state.results ? 
                <div>
                <header className="container-with-shadow p3 search-filters-bar--jobs-search relative">
                    <div className="neptune-grid1">
                        <div className="search-filters-bar display-flex align-items-center" style={{ height: "42px" }}>
                            <ul className="search-filters-bar__filter-grouping display-flex align-items-center list-style-none jobs-search-facets-list--initial-facets pl4">
                                <li className="search-s-facet pr3 inline-block search-s-facet--f_TP search-s-facet--is-closed ember-view">
                                    <div className="dropdown">
                                        <button type="button" className="btn btn-white dropdown-toggle border-btn" data-toggle="dropdown" aria-expanded="false">Date Posted
                                        <span className="caret"></span>
                                    </button>
                                    <div className="dropdown-menu" role="menu">
                                        <div className="checkbox-wrapper">
                                        <div className="radio" data-search="Order DateTime" >
                                            <label className = "align-boxes-center">
                                            <input name="date_posted" value="day" onChange={this.changeHandler} type="radio"/>&nbsp;&nbsp;Past 24 hrs
                                            </label>
                                        </div>   
                                        <div className="checkbox" data-search="Order DateTime" >
                                            <label className = "align-boxes-center">
                                            <input name="date_posted" value="week" onChange={this.changeHandler} type="radio"/>&nbsp;&nbsp;Past Week
                                            </label>
                                        </div> 
                                        <div className="checkbox" data-search="Order DateTime" >
                                            <label className = "align-boxes-center">
                                            <input name="date_posted" value="month" onChange={this.changeHandler} type="radio"/>&nbsp;&nbsp;Past Month
                                            </label>
                                        </div>      
                                        </div>
                                        <div className="button-panel text-right">
                                        <button type="submit" className="btn arteco-btn" onClick ={this.onSearch}>Apply</button>
                                        <button type="button" className="btn arteco-btn-save" style = {{marginLeft : "10px", marginRight : "10px"}}>Cancel</button>
                                        </div>
                                    </div>
                                    </div>
                            </li>
                            <li className = "search-s-facet pr3 inline-block search-s-facet--f_TP search-s-facet--is-closed ember-view">
                                <div className="dropdown">
                                    <button type="button" className="btn btn-white dropdown-toggle border-btn" data-toggle="dropdown" aria-expanded="false">Company
                                        <span className="caret"></span>
                                    </button>
                                    <div className="dropdown-menu" role="menu">
                                        <div className ="jobs-search-box1">
                                            <input type = "text" onChange={this.changeHandler} name ="company" id = "jobsearch3" className ="jobs-search-box__input1" placeholder = "Search by Company Name"/>
                                        </div>                                       
                                        <div className="button-panel text-right">
                                        <button type="submit" className="btn arteco-btn" onClick ={this.onSearch}>Apply</button>
                                        <button type="button" className="btn arteco-btn-save" style = {{marginLeft : "10px", marginRight : "10px"}}>Cancel</button>
                                        </div>
                                    </div>
                                    </div>
                            </li>
                            <li className = "search-s-facet pr3 inline-block search-s-facet--f_TP search-s-facet--is-closed ember-view">
                                <div className="dropdown">
                                    <button type="button" className="btn btn-white dropdown-toggle border-btn" data-toggle="dropdown" aria-expanded="false">Location
                                        <span className="caret"></span>
                                    </button>
                                    <div className="dropdown-menu" role="menu">
                                        <div className ="jobs-search-box1">
                                            <input type = "text" id = "jobsearch4" onChange={this.changeHandler} name ="location" className ="jobs-search-box__input1" placeholder = "Search by Location"/>
                                        </div> 
                                        <div className="button-panel text-right">
                                        <button type="submit" className="btn arteco-btn"  onClick ={this.onSearch}>Apply</button>
                                        <button type="button" className="btn arteco-btn-save" style = {{marginLeft : "10px", marginRight : "10px"}}>Cancel</button>
                                        </div>
                                    </div>
                                    </div>
                            </li>
                            <li className = "search-s-facet pr3 inline-block search-s-facet--f_TP search-s-facet--is-closed ember-view">
                                <div className="dropdown">
                                    <button type="button" className="btn btn-white dropdown-toggle border-btn" data-toggle="dropdown" aria-expanded="false">Job Type
                                        <span className="caret"></span>
                                    </button>
                                    <div className="dropdown-menu" role="menu">
                                        <div className="checkbox-wrapper">
                                        <div className="checkbox" data-search="Full Time" >
                                            <label className = "align-boxes-center">
                                            <input name="employment_type" onChange={this.changeHandler} value="FullTime" type="radio"/>&nbsp;&nbsp;Full Time
                                            </label>
                                        </div>   
                                        <div className="checkbox" data-search="Part Time" >
                                            <label className = "align-boxes-center">
                                            <input name="employment_type" onChange={this.changeHandler} value="Parttime" type="radio"/>&nbsp;&nbsp;Part Time
                                            </label>
                                        </div>  
                                        <div className="checkbox" data-search="Contract" >
                                            <label className = "align-boxes-center">
                                            <input name="employment_type" onChange={this.changeHandler} value="Contract" type="radio"/>&nbsp;&nbsp;Contract
                                            </label>
                                        </div>  
                                        <div className="checkbox" data-search="Temporary" >
                                            <label className = "align-boxes-center">
                                            <input name="employment_type" onChange={this.changeHandler} value="Temporary" type="radio"/>&nbsp;&nbsp;Temporary
                                            </label>
                                        </div>
                                        <div className="checkbox" data-search="Internship" >
                                            <label className = "align-boxes-center">
                                            <input name="employment_type" onChange={this.changeHandler} value="Internship" type="radio"/>&nbsp;&nbsp;Internship
                                            </label>
                                        </div>
                                        <div className="checkbox" data-search="Volunteer" >
                                            <label className = "align-boxes-center">
                                            <input name="employment_type" onChange={this.changeHandler} value="Volunteer" type="radio"/>&nbsp;&nbsp;Volunteer
                                            </label>
                                        </div>          
                                        </div>
                                        <div className="button-panel text-right">
                                        <button type="submit" className="btn arteco-btn" onClick ={this.onSearch}>Apply</button>
                                        <button type="button" className="btn arteco-btn-save" style = {{marginLeft : "10px", marginRight : "10px"}}>Cancel</button>
                                        </div>
                                    </div>
                                    </div>
                            </li>
                        </ul>
                    </div>
                </div>
           </header>  
           <div className = "jobs-search-two-pane__wrapper jobs-search-two-pane__wrapper--two-pane">
                <div className = "neptune-grid one-column full-height">
                    <div className = "display-flex full-height">
                        <div className = "jobs-search-two-pane__results jobs-search-two-pane__results--responsive display-flex full-width">
                            <div className = "jobs-search-results jobs-search-results--is-two-pane" tabIndex = "-1">
                                <ul className = "jobs-search-results__list artdeco-list artdeco-list--offset-4">
                                    <JobList 
                                    jobs={this.state.jobdata} 
                                    getSelectedJob={this.openJob} 
                                    selectedJob={currentjobliststate}
                                    self = {this}/>
                                </ul>
                            </div>
                        </div>
                        <div className = "jobs-search-two-pane__details pt4 ph3 jobs-search-two-pane__details--responsive ember-view">
                            <div id = "job-view-layout jobs-details ember-view">
                            <JobDetails 
                                    jobs={currentjobliststate} self = {this}
                            /> 
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div> :
            <div className="neptune-grid1">
                <div className="col-6 offset-3 text-center">
                <br />
                <br />
                <img alt="" src="images/nojobs.png" />
                <br />
                <br />
                <span style={{ fontSize: "150%" }}>
                Sorry, there are no jobs to display.
                </span>
                <br />
                <br /> <br />
                <br />
            </div> 
            </div>
           } 
      </div>   
      )
    }
}

const JobList = ({jobs, getSelectedJob, selectedJob, self }) => {
        let jobList = jobs.map(function(job, i) {    
            return <JobListItem job={job} key = {i} openJob={getSelectedJob} self = {self} selectedJob={selectedJob === job}/>
        })
        return (
            <li className = "occludable-update artdeco-list__item p0 ember-view">                
                {jobList}
            </li>
        );
}

const JobListItem = ({ job, openJob, selectedJob, self}) => {
    var classes = "job-card-search"
    if(selectedJob) {
        classes += " job-card-search--is-active";
    }
    // console.log(job)   
    return (
        <div className={classes} onClick={() => openJob(job._id)}>
            <div className = "media">
            <a href=" "className = "pull-left"><img alt=""src = {job.company_logo} style = {{height : "56px", width : "56px"}}></img></a>
            <div className = "artdeco-entity-lockup--size-4 gap1">
            <a href = {`/job/view/${job._id}`} onClick = {(event) => self.viewjob(event, job)}><div className="job-item__subject" >
            {job.title}
            </div></a>
            <div className="job-item__name">{job.company}</div>
            <div className="job-item__location"><FontAwesomeIcon className = "fa-map-marker-alt" icon="map-marker-alt"></FontAwesomeIcon>&nbsp;&nbsp;{job.location}</div>
            <div className="job-item__message" style = {{textOverflow: "ellipsis", whiteSpace: "pre-wrap", overflow: "hidden"}}>{job.job_description}</div>
            </div>  
            </div>
        </div>
    );
};

const JobDetails = ({jobs, self}) =>{
    if(!jobs) {
        return (
            <div className="jobs-details__wrapper">
                <div className="empty-container">
                    <div className="empty-container__content">
                        
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="jobs-details__main-content--single-pane full-width relative">
            <div className="jobs-box jobs-box--fadein jobs-box--full-width jobs-details-top-card jobs-box--no-bottom-offset ember-view">
                <div className = "media">
                    <a href=" "className = "pull-left"><img src = {jobs.company_logo} alt=" "style = {{height : "150px", width : "150px"}}></img></a>
                    <div className = "artdeco-entity-lockup--size-4 gap1">
                    <a href = {`/job/view/${jobs._id}`} onClick = {(event) => self.viewjob(event, jobs)}><div className="job-details__subject" >
                    {jobs.title}
                    </div></a>
                    <div className="job-details__name">{jobs.company}</div>
                    <div className="job-details__location"><FontAwesomeIcon className = "fa-map-marker-alt" icon="map-marker-alt"></FontAwesomeIcon>&nbsp;&nbsp;{jobs.location}</div>
                    <div className="job-details__posted">Posted on {jobs.posted_date}</div>
                    {jobs.application_method  === "Easy" ? 
                        <button type="submit" className="btn arteco-btn" style ={{width : "150px"}} onClick = {(event) => self.easyapplyjob(event, jobs)}>Easy Apply</button> :
                        <button type="submit" className="btn arteco-btn" onClick = {(event) => self.normalapplyjob(event, jobs)}>Apply</button>
                    }
                </div>  
            </div>
            </div>
            <div className="jobs-description__container">
                <h2 className = "job-desc-title">Job Description</h2>
                <div className="jobs-description__content" style = {{whiteSpace : "pre-wrap"}}>
                    <span style = {{color :"#5e6d77"}}>{jobs.job_description}</span>
                </div>
            </div>
            <div className="jobs-description__container">
                <h2 className = "job-desc-title">Job Function</h2>
                <div className="jobs-description__content" style = {{whiteSpace : "pre-wrap"}}>
                    <span style = {{color :"#5e6d77"}}>{jobs.job_function}</span>
                </div>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        searchjob: state.searchjob
    }
}

export default withRouter(reduxForm({
    form: "Easy_Apply"
    })(connect(mapStateToProps, { searchjob, logjobclicks }) (SearchJobs)));