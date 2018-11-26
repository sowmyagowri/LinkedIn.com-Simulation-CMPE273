import React, {Component} from 'react';
import '../../App.css';
import '../../jobsearch_wrapper.css';
import Navbar from '../NavBar/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class SearchJobs extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentjoblistid : 1,
            jobdata : [
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
               expiry_date : "sdfcsdf" }, {
                id : 2,
                posted_by : "IBM",
                title : "Sr. Product Marketing Manager - QRadar Security Intelligence Promoted" ,
                job_description : "Upwork2 is the world's largest freelancing website. Each year $1.5 billion of work happens through Upwork, allowing businesses to get more done and helping professionals break free of traditional time and place boundaries and work anytime, anywhere on projects they love. At Upwork, you'll help build on this momentum. Together, well create economic and social value on a global scale, providing a trusted online workplace for businesses to connect with extraordinary talent and work without limits",
               industry : "industry",
                employment_type : "fulltime",
               location : "Sanjose",
               job_function : "adadawdfw",
               company_logo : "/images/linkedin-logo1.jpg",
               posted_date : "ssdsd",
               expiry_date : "sdfcsdf"
               },
               {
                id : 3,
                posted_by : "CISCO",
                title : "Security and Incident Manager" ,
                job_description : "Upwork3 is the world's largest freelancing website. Each year $1.5 billion of work happens through Upwork, allowing businesses to get more done and helping professionals break free of traditional time and place boundaries and work anytime, anywhere on projects they love. At Upwork, you'll help build on this momentum. Together, well create economic and social value on a global scale, providing a trusted online workplace for businesses to connect with extraordinary talent and work without limits",
               industry : "industry",
                employment_type : "fulltime",
               location : "San Francisco",
               job_function : "adadawdfw sdfsfdsfdsg dgsgdsgsg\n sdgsdgsdgsg dgsdgdsgsgsdgsgsdgs",
               company_logo : "/images/cisco.png",
               posted_date : "ssdsd",
               expiry_date : "sdfcsdf" }, {
                id : 4,
                posted_by : "IBM",
                title : "Sr. Product Marketing Manager - QRadar Security Intelligence Promoted" ,
                job_description : "Upwork4 is the world's largest freelancing website. Each year $1.5 billion of work happens through Upwork, allowing businesses to get more done and helping professionals break free of traditional time and place boundaries and work anytime, anywhere on projects they love. At Upwork, you'll help build on this momentum. Together, well create economic and social value on a global scale, providing a trusted online workplace for businesses to connect with extraordinary talent and work without limits",
               industry : "industry",
                employment_type : "fulltime",
               location : "sanjose",
               job_function : "adadawdfw",
               company_logo : "/images/linkedin-logo1.jpg",
               posted_date : "ssdsd",
               expiry_date : "sdfcsdf"
               },
               {
                id : 5,
                posted_by : "CISCO",
                title : "Security and Incident Manager" ,
                job_description : "Upwork5 is the world's largest freelancing website. Each year $1.5 billion of work happens through Upwork, allowing businesses to get more done and helping professionals break free of traditional time and place boundaries and work anytime, anywhere on projects they love. At Upwork, you'll help build on this momentum. Together, well create economic and social value on a global scale, providing a trusted online workplace for businesses to connect with extraordinary talent and work without limits",
               industry : "industry",
                employment_type : "fulltime",
               location : "Santa Clara",
               job_function : "adadawdfw",
               company_logo : "/images/cisco.png",
               posted_date : "ssdsd",
               expiry_date : "sdfcsdf" }, {
                id : 6,
                posted_by : "IBM",
                title : "Sr. Product Marketing Manager - QRadar Security Intelligence Promoted" ,
                job_description : "Upwork6 is the world's largest freelancing website. Each year $1.5 billion of work happens through Upwork, allowing businesses to get more done and helping professionals break free of traditional time and place boundaries and work anytime, anywhere on projects they love. At Upwork, you'll help build on this momentum. Together, well create economic and social value on a global scale, providing a trusted online workplace for businesses to connect with extraordinary talent and work without limits",
               industry : "industry",
                employment_type : "fulltime",
               location : "Los Angeles",
               job_function : "adadawdfw",
               company_logo : "/images/linkedin-logo1.jpg",
               posted_date : "ssdsd",
               expiry_date : "sdfcsdf"
               }
            ]
        };
        this.openJob = this.openJob.bind(this);
    }

    openJob(id) {
        this.setState({
            currentjoblistid: id,
        });
    };

    componentDidMount() {
        //call to action
    }
    

    render(){
        var currentjobliststate = this.state.jobdata.find(x => x.id === this.state.currentjoblistid);
        console.log(currentjobliststate)
        return (
            <div className="jobsearch-wrapper">
                <Navbar></Navbar>
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
                                        <div className="checkbox" data-search="Order DateTime" >
                                            <label className = "align-boxes-center">
                                            <input name="selectedColumns" value="Past24hrs" type="checkbox"/>&nbsp;&nbsp;Past 24 hrs
                                            </label>
                                        </div>   
                                        <div className="checkbox" data-search="Order DateTime" >
                                            <label className = "align-boxes-center">
                                            <input name="selectedColumns" value="PastMonth" type="checkbox"/>&nbsp;&nbsp;Past Month
                                            </label>
                                        </div>  
                                        <div className="checkbox" data-search="Order DateTime" >
                                            <label className = "align-boxes-center">
                                            <input name="selectedColumns" value="Anytime" type="checkbox"/>&nbsp;&nbsp;Anytime
                                            </label>
                                        </div>     
                                        </div>
                                        <div className="button-panel text-right">
                                        <button type="submit" className="btn arteco-btn">Apply</button>
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
                                            <input type = "text" id = "jobsearch3" className ="jobs-search-box__input1" placeholder = "Search by Company Name"/>
                                        </div>                                       
                                        <div className="button-panel text-right">
                                        <button type="submit" className="btn arteco-btn">Apply</button>
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
                                            <input type = "text" id = "jobsearch4" className ="jobs-search-box__input1" placeholder = "Search by Location"/>
                                        </div> 
                                        <div className="button-panel text-right">
                                        <button type="submit" className="btn arteco-btn">Apply</button>
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
                                            <input name="selectedColumns" value="FullTime" type="checkbox"/>&nbsp;&nbsp;Full Time
                                            </label>
                                        </div>   
                                        <div className="checkbox" data-search="Part Time" >
                                            <label className = "align-boxes-center">
                                            <input name="selectedColumns" value="Parttime" type="checkbox"/>&nbsp;&nbsp;Part Time
                                            </label>
                                        </div>  
                                        <div className="checkbox" data-search="Contract" >
                                            <label className = "align-boxes-center">
                                            <input name="selectedColumns" value="Contract" type="checkbox"/>&nbsp;&nbsp;Contract
                                            </label>
                                        </div>  
                                        <div className="checkbox" data-search="Temporary" >
                                            <label className = "align-boxes-center">
                                            <input name="selectedColumns" value="Temporary" type="checkbox"/>&nbsp;&nbsp;Temporary
                                            </label>
                                        </div>     
                                        </div>
                                        <div className="button-panel text-right">
                                        <button type="submit" className="btn arteco-btn">Apply</button>
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
                                    selectedJob={currentjobliststate}/>
                                </ul>
                            </div>
                        </div>
                        <div className = "jobs-search-two-pane__details pt4 ph3 jobs-search-two-pane__details--responsive ember-view">
                            <div id = "job-view-layout jobs-details ember-view">
                            <JobDetails 
                                    jobs={currentjobliststate}
                            />
                            </div>
                        </div>
                    </div>
                </div>
           </div>
      </div>   
      )
    }
}

const JobList = ({jobs, getSelectedJob, selectedJob }) => {
        let jobList = jobs.map(function(job, i) {    
            return <JobListItem job={job} openJob={getSelectedJob} selectedJob={selectedJob === job}/>
        })
        return (
            <li className = "occludable-update artdeco-list__item p0 ember-view">                
                {jobList}
            </li>
        );
}

const JobListItem = ({ job, openJob, selectedJob}) => {
    var classes = "job-card-search"
    if(selectedJob) {
        classes += " job-card-search--is-active";
    }
    console.log(job)   
    return (
        <div className={classes} onClick={() => openJob(job.id)}>
            <div className = "media">
            <a href=" "className = "pull-left"><img alt=""src = {job.company_logo} style = {{height : "56px", width : "56px"}}></img></a>
            <div className = "artdeco-entity-lockup--size-4 gap1">
            <a href = {`/job/view/${job.id}`}><div className="job-item__subject" >
            {job.title}
            </div></a>
            <div className="job-item__name">{job.posted_by}</div>
            <div className="job-item__location"><FontAwesomeIcon className = "fa-map-marker-alt" icon="map-marker-alt"></FontAwesomeIcon>&nbsp;&nbsp;{job.location}</div>
            <div className="job-item__message" style = {{textOverflow: "ellipsis", whiteSpace: "pre-wrap", overflow: "hidden"}}>{job.job_description}</div>
            </div>  
            </div>
        </div>
    );
};

const JobDetails = ({jobs}) =>{
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
                    <a href = {`/job/view/${jobs.id}`}><div className="job-details__subject" >
                    {jobs.title}
                    </div></a>
                    <div className="job-details__name">{jobs.posted_by}</div>
                    <div className="job-details__location"><FontAwesomeIcon className = "fa-map-marker-alt" icon="map-marker-alt"></FontAwesomeIcon>&nbsp;&nbsp;{jobs.location}</div>
                    <div className="job-details__posted">Posted on {jobs.posted_date}</div>
                    <button type="submit" className="btn arteco-btn">Apply</button>
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

export default SearchJobs;