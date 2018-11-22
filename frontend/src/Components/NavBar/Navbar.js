import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Navbar.css';
import { withRouter } from 'react-router-dom';

class Navbar extends Component {
    constructor(props) { 
        super(props);
    }

    render() {
        return (
            <div className="navbar fixed-top navbar-dark bg-dark" style={{ height: "52px" }}>
                <div className="home_wrapper">
                    <div className="nav-main__content full-height display-flex align-items-center" role="navigation">
                        <h1><a className="navbar-brand" href="#" style={{ marginTop: "10px" }}><img src={"/images/linkedin-logo2.png"} alt="" /></a></h1>
                        <div className="nav-search-bar">
                            <div className="nav-typeahead-wormhole">
                                <div className="jobs-search-box">
                                    <label htmlFor="jobsearch1" className="visually-hidden"></label>
                                    <FontAwesomeIcon className="fa-search" icon="search"></FontAwesomeIcon>
                                    <input type="text" id="jobsearch1" className="jobs-search-box__input" placeholder="Search Jobs" />
                                </div>
                            </div>
                        </div>
                        <div className="nav-search-bar" style={{ marginLeft: "10px" }}>
                            <div className="nav-typeahead-wormhole">
                                <div className="jobs-map-box">
                                    <label htmlFor="jobsearch2" className="visually-hidden"></label>
                                    <FontAwesomeIcon className="fa-map-marker-alt" icon="map-marker-alt"></FontAwesomeIcon>
                                    <input type="text" id="jobsearch2" className="jobs-map-box__input" placeholder="United States" /></div>
                            </div>
                        </div>
                        <div className="nav-search-bar" style={{ marginLeft: "10px" }}>
                            <div className="nav-typeahead-wormhole">
                                <button type="submit" id="jobsearch3" className="search-jobs">Search</button></div>
                        </div>
                        <ul className="nav-main nav-container display-flex full-height" role="navigation" aria-label="primary">
                        <span className = "nav-item nav-item__icon">
                            <li className="nav-item--jobs">
                            <a href="/searchjobs" className= "nav-item__link nav-item__link--underline js-nav-item-link">
                                <FontAwesomeIcon color="#dee2e6" size="lg" icon="suitcase"></FontAwesomeIcon><small className ="nocolor small">Jobs</small></a></li></span>
                        <span className = "nav-item nav-item__icon">
                            <li className="nav-item--messaging"><a href="/messages" className= "nav-item__link nav-item__link--underline js-nav-item-link">
                                <FontAwesomeIcon color="#dee2e6" size="lg" icon="comments"></FontAwesomeIcon><small className ="nocolor small">Messaging</small></a></li></span>
                            <span className = "nav-item nav-item__icon">
                            <li className="nav-item--profile">
                            <div className ="dropdown">
                            <button type="button" class="nav-item__link nav-item__link--underline js-nav-item-link dropdown-toggle"  id="dropdownMenuProfile"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <FontAwesomeIcon color="#dee2e6" size="lg" icon="user-circle"></FontAwesomeIcon><small className ="nocolor small">Me</small></button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuProfile">
                                <a class="dropdown-item" href="/profile">Profile</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="/searchjobs">Job Postings</a>
                                <a class="dropdown-item" href="/jobs/saved">Saved Jobs</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#">Sign Out</a></div>
                            </div>
                            </li></span> 
                        </ul>
                        <ul className="nav-side nav-container display-flex full-height" role="navigation" aria-label="primary">
                        <span className = "nav-item nav-item__icon">
                            <li className="nav-item--postjobs">
                            <a href="/searchjobs" className= "nav-item__link nav-item__link--underline js-nav-item-link">
                                <FontAwesomeIcon color="#dee2e6" size="lg" icon="calendar-alt"></FontAwesomeIcon><small className ="nocolor small" style ={{whiteSpace : "nowrap"}}>Post a Job</small></a></li></span>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(Navbar);