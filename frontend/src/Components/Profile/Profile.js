import React, {Component} from 'react';
import '../../App.css';
import '../../profile_wrapper.css';
import Navbar from '../NavBar/Navbar';
import { Field, reduxForm } from "redux-form";
import {Redirect, withRouter} from 'react-router-dom';
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {
          
        };
    }

    componentDidMount() {
        //call to action
    }
    

    render() {
        return (
            <div className="profile-wrapper">
                <Navbar></Navbar>
                <div className="pv-content profile-view-grid neptune-grid2 two-column">
                    <div className="core-rail">
                        <div className="Elevation-2dp profile-background-image profile-background-image--loading ember-view">
                        </div>
                        <div className="pv-profile-section pv-top-card-section artdeco-container-card ember-view">
                            <div className="mt4 display-flex ember-view">

                 <div className="modal fade  bd-example-modal-lg" id="profilemodal" tabIndex="-1" role="dialog" aria-labelledby="profilemodallabel" aria-hidden="true"  style = {{marginTop : "40px"}}>
                        <div className="modal-dialog modal-dialog-centered modal-lg">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="profilemodallabel">Edit intro</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                &times;
                                </button>
                            </div>
                            <div className="modal-body">
                            <div className="row form-group">
                                <div className = "col-xs-6 col-md-6">
                                <label htmlFor="position-firstname-typeahead" className="mb1 required">First Name</label>
                                <input className = "form-control" id="position-firstname-typeahead" maxLength="100" type="text"/>
                                </div>

                                <div className = "col-xs-6 col-md-6">
                                <label htmlFor="position-lastname-typeahead" className="mb1 required">Last Name</label>
                                <input className = "form-control" id="position-lastname-typeahead" maxLength="100" type="text"/>
                                </div>
                            </div>

                            <label htmlFor="position-profilesummary-typeahead" className="mb1 required">Profile Summary</label>
                            <textarea className = "form-control" id="position-profilesummary-typeahead"/>

                            <div className="row form-group">
                                <div className = "col-xs-6 col-md-6">
                                <label htmlFor="position-state-typeahead" className="mb1 required">State</label>
                                <select className = "form-control" id="position-state-typeahead" maxLength="100" type="text">
                                     <option value="">United States</option>
                                    <option value="AL">Alabama</option>
                                    <option value="AK">Alaska</option>
                                    <option value="AZ">Arizona</option>
                                    <option value="AR">Arkansas</option>
                                    <option value="CA">California</option>
                                    <option value="CO">Colorado</option>
                                    <option value="CT">Connecticut</option>
                                    <option value="DE">Delaware</option>
                                    <option value="DC">District Of Columbia</option>
                                    <option value="FL">Florida</option>
                                    <option value="GA">Georgia</option>
                                    <option value="HI">Hawaii</option>
                                    <option value="ID">Idaho</option>
                                    <option value="IL">Illinois</option>
                                    <option value="IN">Indiana</option>
                                    <option value="IA">Iowa</option>
                                    <option value="KS">Kansas</option>
                                    <option value="KY">Kentucky</option>
                                    <option value="LA">Louisiana</option>
                                    <option value="ME">Maine</option>
                                    <option value="MD">Maryland</option>
                                    <option value="MA">Massachusetts</option>
                                    <option value="MI">Michigan</option>
                                    <option value="MN">Minnesota</option>
                                    <option value="MS">Mississippi</option>
                                    <option value="MO">Missouri</option>
                                    <option value="MT">Montana</option>
                                    <option value="NE">Nebraska</option>
                                    <option value="NV">Nevada</option>
                                    <option value="NH">New Hampshire</option>
                                    <option value="NJ">New Jersey</option>
                                    <option value="NM">New Mexico</option>
                                    <option value="NY">New York</option>
                                    <option value="NC">North Carolina</option>
                                    <option value="ND">North Dakota</option>
                                    <option value="OH">Ohio</option>
                                    <option value="OK">Oklahoma</option>
                                    <option value="OR">Oregon</option>
                                    <option value="PA">Pennsylvania</option>
                                    <option value="RI">Rhode Island</option>
                                    <option value="SC">South Carolina</option>
                                    <option value="SD">South Dakota</option>
                                    <option value="TN">Tennessee</option>
                                    <option value="TX">Texas</option>
                                    <option value="UT">Utah</option>
                                    <option value="VT">Vermont</option>
                                    <option value="VA">Virginia</option>
                                    <option value="WA">Washington</option>
                                    <option value="WV">West Virginia</option>
                                    <option value="WI">Wisconsin</option>
                                    <option value="WY">Wyoming</option>
                                </select>				
	
                                </div>

                                <div className = "col-xs-6 col-md-6">
                                <label htmlFor="position-zip-typeahead" className="mb1 required">Zip Code</label>
                                <input className = "form-control" id="position-lastname-typeahead" pattern="[0-9]{5}" placeholder="Five digit zip code" type="text"/>
                                </div>
                            </div>

                            <label htmlFor="position-phone-typeahead" className="mb1 required">Phone Number</label>
                            <input className = "form-control" id="position-phone-typeahead"  pattern="[0-9]{10}" placeholder="1234567890" type="text"/>
                            
                            <label htmlFor="position-address-typeahead" className="mb1 required">Address</label>
                            <textarea className = "form-control" id="position-address-typeahead"/>

                            <label htmlFor="position-resume-typeahead" className="mb1 required">Add your Resume</label>
                            <div className="form-group">
                            <button type="button" className="btn btn-outline-primary" id="position-resume-typeahead">Upload</button>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn arteco-btn-save" data-dismiss="modal">Close</button>
                                <button type="button" className="btn arteco-btn" style = {{width : "150px"}}>Save changes</button>
                            </div>
                            </div>
                            </div>
                        </div>
                    </div>

                <div className = "pv-entity__actions" data-toggle="modal" data-target="#profilemodal"><FontAwesomeIcon icon="pencil-alt" color="#0073b1" size ="lg"/></div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="row">
                        <div className="col-xs-12 col-sm-4 text-center"> <img src="/images/avatar.png" alt="" className="center-block img-circle rounded-circle img-thumbnail img-responsive"/> 
                        </div>
                          <div className="col-xs-12 col-sm-8">
                            <h3>Vince Nardone</h3>
                            <p>California</p>
                            <p><strong>Hobbies: </strong> Read, out with friends, listen to music, dance, draw and learn new things. </p>
                            {/* <p><strong>City: </strong> <span className="label label-info tags"></span> <span className="label label-info tags"></span> </p> */}
                          </div>
                        </div>
                        <hr/>
                        <p><strong>Profile Summary: </strong>Student of SJSU </p>
                      </div>
                      <hr/>
                    </div>
                 </div>
              </div>

              <div className = "pv-profile-section artdeco-container-card ember-view gap">
                    <header className = "pv-profile-section__card-header">

                    <div className="modal fade  bd-example-modal-lg" id="experiencemodal" tabIndex="-1" role="dialog" aria-labelledby="experiencemodallabel" aria-hidden="true"  style = {{marginTop : "40px"}}>
                        <div className="modal-dialog modal-dialog-centered modal-lg">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="experiencemodallabel">Add Experience</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                &times;
                                </button>
                            </div>
                            <div className="modal-body">
                            <label htmlFor="position-title-typeahead" className="mb1 required">Title</label>
                            <input className = "form-control" id="position-title-typeahead" placeholder="Ex: Manager" maxLength="100" type="text"/>

                            <label htmlFor="position-company-typeahead" className="mb1 required">Company</label>
                            <input className = "form-control" id="position-company-typeahead" placeholder="Ex: Microsoft" maxLength="100" type="text"/>

                            <label htmlFor="position-location-typeahead" className="mb1 required">Location</label>
                            <input className = "form-control" id="position-location-typeahead" placeholder="Ex: London, United Kingdom" maxLength="100" type="text"/>

                            <label htmlFor="position-date-typeahead" className="mb1 required">From</label>
                            <select className = "form-control edit-date" id="position-date-typeahead" name="startMonth">
                            <option value="">Month</option>
                            <option value="1">January</option>
                            <option value="2">February</option>
                            <option value="3">March</option>
                            <option value="4">April</option>
                            <option value="5">May</option>
                            <option value="6">June</option>
                            <option value="7">July</option>
                            <option value="8">August</option>
                            <option value="9">September</option>
                            <option value="10">October</option>
                            <option value="11">November</option>
                            <option value="12">December</option>
                            </select>

                            <select name="startYear" id="position-start-typeahead" className = "form-control edit-year">  
                            <option value="">Year</option>
                            <option value="2018">2018</option>
                            <option value="2017">2017</option>
                            <option value="2016">2016</option>
                            <option value="2015">2015</option>
                            <option value="2014">2014</option>
                            <option value="2013">2013</option>
                            <option value="2012">2012</option>
                            <option value="2011">2011</option>
                            <option value="2010">2010</option>
                            <option value="2009">2009</option>
                            </select>

                            <label htmlFor="position-description-typeahead" className="mb1 required">Description</label>
                            <textarea className = "form-control" id="position-description-typeahead"/>
                            
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn arteco-btn-save" data-dismiss="modal">Close</button>
                                <button type="button" className="btn arteco-btn" style = {{width : "150px"}}>Save changes</button>
                            </div>
                            </div>
                        </div>
                        </div>

                     <div className = "pv-entity__actions" data-toggle="modal" data-target="#experiencemodal"><FontAwesomeIcon icon="plus" color="#0073b1" size ="lg"/></div>

                    <h2 className = "pv-profile-section__card-heading t-20 t-black t-normal">Experience</h2>
                    </header>   
                    <div className = "pv-entity__position-group-pager pv-profile-section__list-item ember-view">
                        <li className ="pv-profile-section__card-item-v2 pv-profile-section pv-position-entity ember-view">
                            <div className = "pv-entity__actions"><FontAwesomeIcon icon="pencil-alt" color="#0073b1" size ="lg"/></div>
                            <div className ="pv-entity__summary-info pv-entity__summary-info--background-section mb2">
                            <h3 className = "t-16 t-black t-bold">Software Engineer</h3> 
                            <h4 className = "t-16 t-black t-normal">SJSU</h4>
                            </div>
                            <div className = "ember-view">
                            <p className ="pv-entity__description t-14 t-black t-normal ember-view">Determines operational feasibility by evaluating analysis, problem definition, requirements, solution development, and proposed solutions.</p>
                            </div>
                        </li>
                    </div>                   
              </div>

              <div className = "pv-profile-section artdeco-container-card ember-view gap">
                    <header className = "pv-profile-section__card-header">

                        <div className="modal fade  bd-example-modal-lg" id="educationmodal" tabIndex="-1" role="dialog" aria-labelledby="educationmodallabel" aria-hidden="true" style = {{marginTop : "40px"}}>
                            <div className="modal-dialog modal-dialog-centered modal-lg">
                                <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="educationmodallabel">Add Education</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    &times;
                                    </button>
                                </div>
                                <div className="modal-body">
                            <label htmlFor="position-school-typeahead" className="mb1 required">School</label>
                            <input className = "form-control" id="position-school-typeahead" placeholder="Ex: Boston University" maxLength="100" type="text"/>

                            <label htmlFor="position-degree-typeahead" className="mb1 required">Degree</label>
                            <input className = "form-control" id="position-degree-typeahead" placeholder="Ex: Bachelor's" maxLength="100" type="text"/>

                            <label htmlFor="position-date-typeahead" className="mb1 required">From - To</label>
                            <select name="startYear" id="position-start-typeahead"  className = "form-control edit-year">  
                            <option value="">Year</option>
                            <option value="2018">2018</option>
                            <option value="2017">2017</option>
                            <option value="2016">2016</option>
                            <option value="2015">2015</option>
                            <option value="2014">2014</option>
                            <option value="2013">2013</option>
                            <option value="2012">2012</option>
                            <option value="2011">2011</option>
                            <option value="2010">2010</option>
                            <option value="2009">2009</option>
                            </select>

                            <select name="endYear" id="position-end-typeahead"  className = "form-control edit-year">  
                            <option value="">Year</option>
                            <option value="2018">2018</option>
                            <option value="2017">2017</option>
                            <option value="2016">2016</option>
                            <option value="2015">2015</option>
                            <option value="2014">2014</option>
                            <option value="2013">2013</option>
                            <option value="2012">2012</option>
                            <option value="2011">2011</option>
                            <option value="2010">2010</option>
                            <option value="2009">2009</option>
                            </select>

                            <label htmlFor="position-description-typeahead" className="mb1 required">Description</label>
                            <textarea className = "form-control" id="position-description-typeahead"/>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary">Save changes</button>
                                </div>
                                </div>
                            </div>
                            </div>

                        <div className = "pv-entity__actions" data-toggle="modal" data-target="#educationmodal"><FontAwesomeIcon icon="plus" color="#0073b1" size ="lg"/></div>

                        <h2 className = "pv-profile-section__card-heading t-20 t-black t-normal">Education</h2>
                    </header>   
                    <div className = "pv-entity__position-group-pager pv-profile-section__list-item ember-view">
                        <li className ="pv-profile-section__card-item-v2 pv-profile-section pv-position-entity ember-view">
                            <div className = "pv-entity__actions"><FontAwesomeIcon icon="pencil-alt" color="#0073b1" size ="lg"/></div>
                            <div className ="pv-entity__summary-info pv-entity__summary-info--background-section mb2">
                            <h3 className = "t-16 t-black t-bold">Software Engineer</h3>
                            <h4 className = "t-16 t-black t-normal">SJSU</h4>
                            </div>
                            <div className = "ember-view">
                            <p className ="pv-entity__description t-14 t-black t-normal ember-view">Determines operational feasibility by evaluating analysis, problem definition, requirements, solution development, and proposed solutions.</p>
                            </div>
                        </li>
                    </div>                   
              </div>

              <div className = "pv-profile-section artdeco-container-card ember-view gap">
                    <header className = "pv-profile-section__card-header">

                         <div className="modal fade  bd-example-modal-lg" id="skillsmodal" tabIndex="-1" role="dialog" aria-labelledby="skillsmodallabel" aria-hidden="true" style = {{marginTop : "40px"}}>
                            <div className="modal-dialog modal-dialog-centered modal-lg">
                                <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="educationmodallabel">Add Skills</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    &times;
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="form-check">
                                    <label className="form-check-label" htmlFor="check1">
                                        <input type="checkbox" className="form-check-input" id="check1" name="Testing" />Testing
                                    </label>
                                    </div>
                                    <div className="form-check">
                                    <label className="form-check-label" htmlFor="check2">
                                        <input type="checkbox" className="form-check-input" id="check2" name="Software Development"/>Software Development
                                    </label>
                                    </div>
                                    <div className="form-check">
                                    <label className="form-check-label" htmlFor="check3">
                                        <input type="checkbox" className="form-check-input"  id="check3" name="Java"/>Java
                                    </label>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn arteco-btn-save" data-dismiss="modal">Close</button>
                                    <button type="button" className="btn arteco-btn" style = {{width : "150px"}}>Save changes</button>
                                </div>
                                </div>
                            </div>
                            </div>

                        <div className = "pv-entity__actions" data-toggle="modal" data-target="#skillsmodal"><FontAwesomeIcon icon="pencil-alt" color="#0073b1" size ="lg"/></div>

                        <h2 className = "pv-profile-section__card-heading t-20 t-black t-normal">Skills</h2>
                    </header>   
                    <div className = "pv-entity__position-group-pager pv-profile-section__list-item ember-view">
                        <li className ="pv-profile-section__card-item-v2 pv-profile-section pv-position-entity ember-view">
                            <div className = "ember-view">
                            <p className ="pv-entity__description t-14 t-black t-normal ember-view">Java, C++</p>
                            </div>
                        </li>
                    </div>                   
              </div>

            </div>
        </div>
      </div>   
      )
    }
}

export default Profile;