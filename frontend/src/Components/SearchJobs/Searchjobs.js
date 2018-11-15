import React, {Component} from 'react';
import '../../App.css';
import '../../jobsearch_wrapper.css';
import '../../navbar.css';
import { Field, reduxForm } from "redux-form";
import {Redirect, withRouter} from 'react-router-dom';
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class SearchJobs extends Component{
    constructor(props){
        super(props);
        this.state = {
          
        };
    }

    componentDidMount() {
        //call to action
    }
    

    render(){
        return(
        <div className = "jobsearch-wrapper">
            <div className="navbar fixed-top navbar-dark bg-dark" style = {{height : "52px"}}>
            <div className = "home_wrapper">
            <div className = "nav-main__content full-height display-flex align-items-center" role = "navigation">
            <h1><a className="navbar-brand" href="#" style = {{marginTop : "10px"}}><img src = {"/linkedin-logo1.jpg"} alt = ""/></a></h1>
                <div className = "nav-search-bar">
                    <div className ="nav-typeahead-wormhole">
                    <div className ="jobs-search-box">
                        <label htmlFor ="jobsearch1" className ="visually-hidden"></label>
                        <FontAwesomeIcon className = "fa-search" icon="search"></FontAwesomeIcon>
                        <input type = "text" id = "jobsearch1" className ="jobs-search-box__input" placeholder = "Search Jobs"/>
                    </div>
                    </div>
                </div>
                <div className = "nav-search-bar" style = {{marginLeft :"10px"}}>
                    <div className ="nav-typeahead-wormhole">
                    <div className ="jobs-map-box">
                        <label htmlFor ="jobsearch2" className ="visually-hidden"></label>
                        <FontAwesomeIcon className = "fa-map-marker-alt" icon="map-marker-alt"></FontAwesomeIcon>
                        <input type = "text" id = "jobsearch2" className ="jobs-map-box__input" placeholder = "United States"/></div>
                    </div>
                </div>
                <div className = "nav-search-bar" style = {{marginLeft :"10px"}}>
                    <div className ="nav-typeahead-wormhole">
                        <button type = "submit" id = "jobsearch3" className ="search-jobs">Search</button></div>
                </div>
            <ul className = "nav-main nav-container display-flex full-height" role = "navigation" aria-label ="primary">
                <li className = "nav-item nav-item--jobs">
                <FontAwesomeIcon color = "#dee2e6" size ="lg" icon="suitcase"></FontAwesomeIcon><a href = "/jobs"></a></li>
                <li className = "nav-item nav-item--messaging">
                <FontAwesomeIcon color = "#dee2e6" size ="lg" icon="comments"></FontAwesomeIcon><a href = "/messages"></a></li>
                <li className = "nav-item nav-item--profile">
                <FontAwesomeIcon color = "#dee2e6" size ="lg" icon="user-circle"></FontAwesomeIcon><a href = "/profile"></a></li>
            </ul>  
            </div>
            </div>
           </div>
           <header className = "container-with-shadow p3 search-filters-bar--jobs-search relative">
                <div className ="neptune-grid1">
                    <div className = "search-filters-bar display-flex align-items-center" style = {{height : "42px"}}>
                        <ul className = "search-filters-bar__filter-grouping display-flex align-items-center list-style-none jobs-search-facets-list--initial-facets pl4">
                            <li className = "search-s-facet pr3 inline-block search-s-facet--f_TP search-s-facet--is-closed ember-view">
                                <div className="dropdown">
                                    <button type="button" class="btn btn-white dropdown-toggle border-btn" data-toggle="dropdown" aria-expanded="false">Date Posted
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
                                        <div class="button-panel text-right">
                                        <button type="submit" className="btn btn-primary">Apply</button>
                                        <button type="button" className="btn btn-white">Cancel</button>
                                        </div>
                                    </div>
                                    </div>
                            </li>
                            <li className = "search-s-facet pr3 inline-block search-s-facet--f_TP search-s-facet--is-closed ember-view">
                                <div className="dropdown">
                                    <button type="button" class="btn btn-white dropdown-toggle border-btn" data-toggle="dropdown" aria-expanded="false">Company
                                        <span className="caret"></span>
                                    </button>
                                    <div className="dropdown-menu" role="menu">
                                        <div className="checkbox-wrapper">
                                        <div className="checkbox" data-search="Cisco" >
                                            <label className = "align-boxes-center">
                                            <input name="selectedColumns" value="Cisco" type="checkbox"/>&nbsp;&nbsp;CISCO
                                            </label>
                                        </div>   
                                        <div className="checkbox" data-search="Google" >
                                            <label className = "align-boxes-center">
                                            <input name="selectedColumns" value="Google" type="checkbox"/>&nbsp;&nbsp;Google
                                            </label>
                                        </div>  
                                        <div className="checkbox" data-search="Apple" >
                                            <label className = "align-boxes-center">
                                            <input name="selectedColumns" value="Apple" type="checkbox"/>&nbsp;&nbsp;Apple
                                            </label>
                                        </div>     
                                        </div>
                                        <div class="button-panel text-right">
                                        <button type="submit" className="btn btn-primary">Apply</button>
                                        <button type="button" className="btn btn-white">Cancel</button>
                                        </div>
                                    </div>
                                    </div>
                            </li>
                            <li className = "search-s-facet pr3 inline-block search-s-facet--f_TP search-s-facet--is-closed ember-view">
                                <div className="dropdown">
                                    <button type="button" class="btn btn-white dropdown-toggle border-btn" data-toggle="dropdown" aria-expanded="false">Experience Level
                                        <span className="caret"></span>
                                    </button>
                                    <div className="dropdown-menu" role="menu">
                                        <div className="checkbox-wrapper">
                                        <div className="checkbox" data-search="Internship" >
                                            <label className = "align-boxes-center">
                                            <input name="selectedColumns" value="Internship" type="checkbox"/>&nbsp;&nbsp;Internship
                                            </label>
                                        </div>   
                                        <div className="checkbox" data-search="Entry Level" >
                                            <label className = "align-boxes-center">
                                            <input name="selectedColumns" value="Entry Level" type="checkbox"/>&nbsp;&nbsp;Entry Level
                                            </label>
                                        </div>  
                                        <div className="checkbox" data-search="Senior Level" >
                                            <label className = "align-boxes-center">
                                            <input name="selectedColumns" value="SeniorLevel" type="checkbox"/>&nbsp;&nbsp;Senior Level
                                            </label>
                                        </div>     
                                        </div>
                                        <div class="button-panel text-right">
                                        <button type="submit" className="btn btn-primary">Apply</button>
                                        <button type="button" className="btn btn-white">Cancel</button>
                                        </div>
                                    </div>
                                    </div>
                            </li>
                            <li className = "search-s-facet pr3 inline-block search-s-facet--f_TP search-s-facet--is-closed ember-view">
                                <div className="dropdown">
                                    <button type="button" class="btn btn-white dropdown-toggle border-btn" data-toggle="dropdown" aria-expanded="false">Job Type
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
                                        <div class="button-panel text-right">
                                        <button type="submit" className="btn btn-primary">Apply</button>
                                        <button type="button" className="btn btn-white">Cancel</button>
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
                                        <li className = "occludable-update artdeco-list__item p0 ember-view">
                                        <div className = "job-card-search--two-pane jobs-search-results__list--card--viewport-tracking-1 job-card-search job-card-search--column job-card-search job-card-search--is-active job-card-search--clickable job-card-search--outline-default ember-view">
                                        test</div>
                                        </li>
                                        <li className = "occludable-update artdeco-list__item p0 ember-view">
                                        test
                                        </li>
                                        <li className = "occludable-update artdeco-list__item p0 ember-view">
                                        test
                                        </li>
                                </ul>
                            </div>
                        </div>
                        <div className = "jobs-search-two-pane__details pt4 ph3 jobs-search-two-pane__details--responsive ember-view">
                            <div id = "job-view-layout jobs-details ember-view">
                            test
                            </div>
                        </div>
                    </div>
                </div>
           </div>
      </div>   
      )
    }
}

export default SearchJobs;