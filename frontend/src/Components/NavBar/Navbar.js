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
                        <h1><a className="navbar-brand" href="#" style={{ marginTop: "10px" }}><img src={"/images/linkedin-logo1.jpg"} alt="" /></a></h1>
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
                            <li className="nav-item nav-item--jobs">
                                <FontAwesomeIcon color="#dee2e6" size="lg" icon="suitcase"></FontAwesomeIcon><a href="/jobs"></a></li>
                            <li className="nav-item nav-item--messaging">
                                <FontAwesomeIcon color="#dee2e6" size="lg" icon="comments"></FontAwesomeIcon><a href="/messages"></a></li>
                            <li className="nav-item nav-item--profile">
                                <FontAwesomeIcon color="#dee2e6" size="lg" icon="user-circle"></FontAwesomeIcon><a href="/profile"></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(Navbar);