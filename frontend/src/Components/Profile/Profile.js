import React, {Component} from 'react';
import '../../App.css';
import '../../profile_wrapper.css';
import Navbar from '../NavBar/Navbar';
import {  reduxForm } from "redux-form";
import { withRouter} from 'react-router-dom';
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { userConstants } from '../../constants';
import { getapplicantprofile, applicantprofilesummary, applicantprofileexperience, applicantprofileeducation, applicantprofileskills } from '../../Actions/applicant_login_profile_actions';

class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {
            firstname : "",
            lastname : "",
            state : "",
            zipcode : "",
            sskills :"",
            profilePicture : "",
            experience : [{}],
            education : [{}],
            skills : "",  
            resume : "",          
            touchedprofile : {
                firstname: false,
                lastname: false,
                state : false,
                zipcode : false,
            },
            profiledata : [],
            isLoading : true
        };
        this.changeHandler = this.changeHandler.bind(this);
        this.profilephotochangeHandler = this.profilephotochangeHandler.bind(this);
        this.openFileDialog = this.openFileDialog.bind(this)
        this.updateSkills = this.updateSkills.bind(this)
        this.submitProfile = this.submitProfile.bind(this)
        this.uploadresume = this.uploadresume.bind(this)
    }

    componentDidMount() {
        //call to action
        const data = JSON.parse(localStorage.getItem(userConstants.USER_DETAILS)).email;
        console.log(localStorage.getItem(userConstants.USER_DETAILS));
        const token =  JSON.parse(localStorage.getItem(userConstants.AUTH_TOKEN));
        this.props.getapplicantprofile(data, token).then(response => {
            console.log("response:", response);
            if(response.payload.status === 200){
                this.setState({ 
                        profiledata: response.payload.data.profile,
                        firstname : response.payload.data.profile.firstName,
                        lastname : response.payload.data.profile.lastName,
                        profilesummary : response.payload.data.profile.profileSummary === undefined || "" ? "" : response.payload.data.profile.profileSummary,
                        state : response.payload.data.profile.state,
                        zipcode : response.payload.data.profile.zipcode,
                        fname : response.payload.data.profile.firstName,
                        lname : response.payload.data.profile.lastName,
                        sstate : response.payload.data.profile.state,
                        zzipcode : response.payload.data.profile.zipcode,
                        phonenumber : response.payload.data.profile.phoneNumber === undefined || ""  ? "" : response.payload.data.profile.phoneNumber,
                        address : response.payload.data.profile.address === undefined || "" ? "" : response.payload.data.profile.address,
                        experience : response.payload.data.profile.experience,
                        education : response.payload.data.profile.education,
                        skills : response.payload.data.profile.skills === undefined || ""  ? "" : response.payload.data.profile.skills,
                        sskills : response.payload.data.profile.skills === undefined || ""  ? "" : response.payload.data.profile.skills,
                        profilePicture : response.payload.data.profile.profilePicture === undefined || ""  ? "/images/avatar.png" : response.payload.data.profile.skills,
                        isLoading : false
                });                
            }
                this.refs.myfirstname.value = this.state.fname;
                this.refs.mylastname.value = this.state.lname;
                this.refs.myprofilesummary.value = this.state.profilesummary;
                this.refs.mystate.value = this.state.sstate;
                this.refs.myzipcode.value = this.state.zzipcode;
                this.refs.myphonenumber.value = this.state.phonenumber
                this.refs.myaddress.value = this.state.address;
                this.refs.myskills.value = this.state.sskills;
        })
    }   

    updateSkills () {
        const email = JSON.parse(localStorage.getItem(userConstants.USER_DETAILS)).email;
        const token =  JSON.parse(localStorage.getItem(userConstants.AUTH_TOKEN));
        
        this.props.applicantprofileskills(email, token).then(response => {
            console.log("response:", response);
            if(response.payload.status === 200){
                console.log("Profile Skills Updated Successfully")
            }
        })
    }

    openFileDialog = (e) => {
        document.getElementById('fileid').click();
    }

    openResumeDialog = (e) => {
        document.getElementById('resume').click();
    }


    uploadresume = (event) => {
        event.preventDefault();
        var file = event.target.files[0]
        console.log(file)
        var formData = new FormData();
        formData.append("description", 'selectedFile')
        formData.append("selectedFile", file);
        console.log(formData);
        this.setState ({
            resume : event.target.files[0].name
        })
    }

    profilephotochangeHandler = (event) => {
        event.preventDefault();
        var file = event.target.files[0]
        console.log(file)
        var formData = new FormData();

        formData.append("description", 'selectedFile')
        formData.append("selectedFile", file);
        console.log(formData);
        this.setState ({
            profilePicture : event.target.files[0].name
        })
    }
     
    changeHandler = (e) => {
        const state = {
          ...this.state,
          [e.target.name]: e.target.value,
          }
        this.setState(state);
    }

    submitProfile = () => {
        if (this.handleValidationProfile()) {
            const email = JSON.parse(localStorage.getItem(userConstants.USER_DETAILS)).email;
            const token =  JSON.parse(localStorage.getItem(userConstants.AUTH_TOKEN));
            const data = {
                email: email,
                firstName : this.state.firstname,
                lastName : this.state.lastname,
                state : this.state.state,
                zipcode : this.state.zipcode,
                address : this.state.address,
                profileSummary : this.state.profilesummary,
                phoneNumber : this.state.phonenumber,
                resume : this.state.resume,
                profilePicture : this.state.profilePicture,
            }
            this.props.applicantprofilesummary(data, token, ).then(response => {
                console.log("response:", response);
                if(response.payload.status === 200){
                    console.log("Profile Summary Updated Successfully")
                }
            })
        }
    } 

    shouldComponentUpdate(nextState) {
        if (nextState.profiledata !== this.state.profiledata) {
            return true; 
        }
        if (nextState.firstname !== this.state.firstname) {
            return true; 
        }
        if (nextState.lastname !== this.state.lastname) {
            return true; 
        }
        if (nextState.state !== this.state.state) {
            return true; 
        }
        if (nextState.zipcode !== this.state.zipcode) {
            return true; 
        }
        else {
            return false 
        }
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touchedprofile: { ...this.state.touchedprofile, [field]: true }
        });
    }


    handleValidationProfile () {
        let formIsValid = false;
        const errors = validateprofile(this.state.firstname,  this.state.lastname, this.state.state, this.state.zipcode);
        if(!errors.firstname && !errors.lastname && !errors.lastname && !errors.state && !errors.zipcode){
          formIsValid = true
        }
        return formIsValid;
    }

    getExperienceContents () {
        const {experience,isLoading} = this.state;
        if(!isLoading) {
            return Object.keys(experience).map(function(i) {
                return <li className ="pv-profile-section__card-item-v2 pv-profile-section pv-position-entity ember-view" key ={i}>
                    {/* <div className = "pv-entity__actions"><FontAwesomeIcon icon="pencil-alt" color="#0073b1" size ="lg"/> </div> */}
                    <EditExperience experience={experience[i]} id = {i}/>
                    <div className ="pv-entity__summary-info pv-entity__summary-info--background-section mb2">
                    <h3 className = "t-16 t-black t-bold">{experience[i].title}</h3> 
                    <h4 className = "t-16 t-black-light t-normal">{experience[i].company}</h4>
                    <h4 className = "t-14 t-black-light t-normal">{experience[i].location}</h4>
                    </div>
                    <div className = "ember-view">
                    <p className ="pv-entity__description t-14 t-black t-normal ember-view">{experience[i].description}</p>
                    </div>
                </li>
            })
       }
    }

    getEducationContents () {
        const {education, isLoading} = this.state;
        if(!isLoading) {
            return Object.keys(education).map(function(i) {
                return <li className ="pv-profile-section__card-item-v2 pv-profile-section pv-position-entity ember-view" key ={i}>
                {/* <div className = "pv-entity__actions"><FontAwesomeIcon icon="pencil-alt" color="#0073b1" size ="lg"/> </div> */}
                <EditEducation education={education[i]} id = {i}/>
                <div className ="pv-entity__summary-info pv-entity__summary-info--background-section mb2">
                <h3 className = "t-16 t-black t-bold">{education[i].school}</h3> 
                <h4 className = "t-16 t-black-light t-normal">{education[i].degree}</h4>
                <h4 className = "t-14 t-black-light t-normal">{education[i].schoolfromYear}&nbsp;-&nbsp;{education[i].schooltoYear}</h4>
                </div>
                <div className = "ember-view">
                <p className ="pv-entity__description t-14 t-black t-normal ember-view">{education[i].description}</p>
                </div>
            </li>
        })
     }
   }

    render() {
        const {isLoading} = this.state;
        if(!isLoading){
            const errors = validateprofile(this.state.firstname,  this.state.lastname, this.state.state, this.state.zipcode);
            var shouldMarkError = (field) => {
                const hasError = errors[field];
                const shouldShow = this.state.touchedprofile[field];
                return hasError ? shouldShow : false;
            };
        }

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
                                <h5 className="modal-title" id="profilemodallabel">Edit Intro</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                &times;
                                </button>
                            </div>
                            <div className="modal-body">
                            <div className="row form-group">
                                <div className = "col-xs-6 col-md-6">
                                <label htmlFor="position-firstname-typeahead" className="mb1 required">First Name</label>
                                <input className = "form-control" name = "firstname" ref = "myfirstname" onChange = {this.changeHandler} id="position-firstname-typeahead" onBlur={this.handleBlur('firstname')} maxLength="100" type="text"/>
                                </div>
                                <div className = "col-xs-6 col-md-6">
                                <label htmlFor="position-lastname-typeahead" className="mb1 required">Last Name</label>
                                <input className = "form-control"  name = "lastname" ref = "mylastname" onChange = {this.changeHandler} onBlur={this.handleBlur('lastname')} id="position-lastname-typeahead" maxLength="100" type="text"/>
                                </div>
                                {!isLoading ?
                                    <div className = "col-xs-6 col-md-6">
                                    {shouldMarkError('firstname') ? <div className=""  style = {{color: "red"}}>&nbsp;First Name is a required field</div> : (null)}
                                    </div> : (null)
                                }
                                {!isLoading ?
                                    <div className = "col-xs-6 col-md-6">
                                    {shouldMarkError('lastname') ? <div className=""  style = {{color: "red"}}>&nbsp;Last Name is a required field</div> : (null)}
                                    </div> : (null)
                                }
                            </div>

                            <label htmlFor="position-profilesummary-typeahead" className="mb1 required">Profile Summary</label>
                            <textarea className = "form-control" name = "profilesummary"  ref = "myprofilesummary" onChange = {this.changeHandler} id="position-profilesummary-typeahead"/>
                            <div className="row form-group">
                                <div className = "col-xs-6 col-md-6">
                                <label htmlFor="position-state-typeahead" className="mb1 required">State</label>
                                <select className = "form-control" name = "state" ref = "mystate" onChange = {this.changeHandler} onBlur={this.handleBlur('state')} id="position-state-typeahead" maxLength="100" type="text">
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
                                <input className = "form-control" name = "zipcode"  ref = "myzipcode" onChange = {this.changeHandler} onBlur={this.handleBlur('zipcode')} id="position-lastname-typeahead" pattern="[0-9]{5}" placeholder="Five digit zip code" type="text"/>
                                </div>
                                {!isLoading ?
                                    <div className = "col-xs-6 col-md-6">
                                    {shouldMarkError('state') ? <div className=""  style = {{color: "red"}}>&nbsp;State is a required field</div> : (null)}
                                    </div> : (null)
                                }
                                {!isLoading ?
                                    <div className = "col-xs-6 col-md-6">
                                    {shouldMarkError('zipcode') ? <div className=""  style = {{color: "red"}}>&nbsp;Zipcode is a required field</div> : (null)}
                                    </div> : (null)
                                }
                            </div>

                            <label htmlFor="position-phone-typeahead" className="mb1 required">Phone Number</label>
                            <input className = "form-control" name = "phonenumber"  ref = "myphonenumber" onChange = {this.changeHandler}  id="position-phone-typeahead"  pattern="[0-9]{10}" placeholder="1234567890" type="text"/>
                            
                            <label htmlFor="position-address-typeahead" className="mb1 required">Address</label>
                            <textarea className = "form-control" name = "address"  ref = "myaddress" onChange = {this.changeHandler}  id="position-address-typeahead"/>

                            <label htmlFor="position-resume-typeahead" className="mb1 required">Add your Resume</label>
                            <div className="form-group">
                                <input type="file" id="resume" onChange={this.uploadresume} style = {{display : "none"}}/>
                                <button type="file" className="btn arteco-btn-save" id="position-resume-typeahead" onClick = {this.openResumeDialog}>Upload
                                </button>&nbsp;&nbsp;{this.state.resume}
                                
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn arteco-btn-save" data-dismiss="modal">Close</button>
                                <button type="submit" className="btn arteco-btn"  onClick = {this.submitProfile} style = {{width : "150px"}}>Save changes</button>
                            </div>
                            </div>
                            </div>
                        </div>
                    </div>

                <div className = "pv-entity__actions" data-toggle="modal" data-target="#profilemodal"><FontAwesomeIcon icon="pencil-alt" color="#0073b1" size ="lg"/></div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="row">
                            <div className="col-xs-12 col-sm-4 text-center"> 
                                <img src= {this.state.profilePicture} alt="" className="center-block img-circle rounded-circle img-thumbnail img-responsive"/> 
                                <div className="rank-label-container">
                                  <input id='fileid' type='file' onChange={this.profilephotochangeHandler} hidden/>
                                  <button type="file" className ="btn btn-default btn-icon-circle" onClick={this.openFileDialog}>
                                  <FontAwesomeIcon icon="pencil-alt" color="black" size ="lg"/></button>
                                </div>
                           </div>
                          <div className="col-xs-12 col-sm-8">
                            <h3>{this.state.fname}&nbsp;{this.state.lname}</h3>
                            <p>{this.state.sstate}</p>
                           {this.state.address ? <p><strong>Address: </strong> {this.state.address} </p>  : (null)}
                            {/* <p><strong>City: </strong> <span className="label label-info tags"></span> <span className="label label-info tags"></span> </p> */}
                          </div>
                        </div>
                        <hr/>
                        {this.state.profilesummary ?
                        <p><strong>Profile Summary: </strong>{this.state.profilesummary}</p> : (null)}
                      </div>
                      <hr/>
                    </div>
                 </div>
              </div>

              <div className = "pv-profile-section artdeco-container-card ember-view gap">
                    <header className = "pv-profile-section__card-header">
                    <Experience experiencelist = {this.state.experience}></Experience>
                        <h2 className = "pv-profile-section__card-heading t-20 t-black t-normal">Experience</h2>
                    </header>   
                    <div className = "pv-entity__position-group-pager pv-profile-section__list-item ember-view">
                        {this.getExperienceContents()}
                    </div>                   
              </div>

              <div className = "pv-profile-section artdeco-container-card ember-view gap">
                    <header className = "pv-profile-section__card-header">
                    <Education></Education>
                        <h2 className = "pv-profile-section__card-heading t-20 t-black t-normal">Education</h2>
                    </header>   
                    <div className = "pv-entity__position-group-pager pv-profile-section__list-item ember-view">
                        {this.getEducationContents()}
                    </div>                   
              </div>

              <div className = "pv-profile-section artdeco-container-card ember-view gap">
                    <header className = "pv-profile-section__card-header">

                         <div className="modal fade  bd-example-modal-lg" id="skillsmodal" tabIndex="-1" role="dialog" aria-labelledby="skillsmodallabel" aria-hidden="true" style = {{marginTop : "40px"}}>
                            <div className="modal-dialog modal-dialog-centered modal-lg">
                                <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="skillsmodallabel">Add Skills</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    &times;
                                    </button>
                                </div>
                                <div className="modal-body">
                                    {/* <div className="form-check">
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
                                    </div> */}
                                    <textarea className = "form-control" ref = "myskills" name = "skills" onChange = {this.changeHandler} id="position-description-typeahead"/>

                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn arteco-btn-save" data-dismiss="modal">Close</button>
                                    <button type="submit" className="btn arteco-btn" onClick = {this.updateSkills} style = {{width : "150px"}}>Save changes</button>
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
                            <p className ="pv-entity__description t-14 t-black t-normal ember-view">{this.state.sskills}</p>
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

class EditExperience extends Component {

constructor(props){
    super(props);
    this.state = {
        title : this.props.experience.title,
        company : this.props.experience.company,
        location : this.props.experience.location,
        fromMonth : this.props.experience.fromMonth,
        fromYear : this.props.experience.fromYear,
        description : this.props.experience.description,
        id : this.props.id,
        touchedexperience : {
            title: false,
            company: false,
            location : false,
            fromMonth : false,
            fromYear : false
        },
    }
    this.changeHandler = this.changeHandler.bind(this);
    this.submitExperience = this.submitExperience.bind(this);
}

submitExperience = () => {
    if (this.handleValidationExperience()) {
        const email = JSON.parse(localStorage.getItem(userConstants.USER_DETAILS)).email;
            var editedExperience = {
                title : this.state.title,
                company : this.state.company,
                location : this.state.location,
                fromMonth : this.state.fromMonth,
                fromYear : this.state.fromYear,
                description : this.state.profilesummary
            }
            var experiencelist = this.props.experiencelist
            experiencelist[this.state.id] = editedExperience
            var data = experiencelist
            console.log(localStorage.getItem(userConstants.USER_DETAILS));
            this.props.applicantprofileexperience(email, localStorage.getItem(userConstants.AUTH_TOKEN, data)).then(response => {
                console.log("response:", response);
                if(response.payload.status === 200){
                    console.log("Profile Experience Updated Successfully")
                }
        })
    }
} 

changeHandler = (e) => {
    const state = {
      ...this.state,
      [e.target.name]: e.target.value,
      }
    this.setState(state);
}

handleBlur = (field) => (evt) => {
    this.setState({
        touchedexperience: { ...this.state.touchedexperience, [field]: true }
    });
}

handleValidationExperience(){
    let formIsValid = false;
    const errors = validateExperience(this.state.title,  this.state.company, this.state.location, this.state.fromMonth, this.state.fromYear);
    if(!errors.title && !errors.company && !errors.location && !errors.fromMonth && !errors.fromYear){
      formIsValid = true
    }
    return formIsValid;
  }


render() {  
    const {title,company,location,fromMonth,fromYear,description,id} = this.state;

    const errors = validateExperience(this.state.title, this.state.company, this.state.location, this.state.fromMonth, this.state.fromYear);
    var shouldMarkError = (field) => {
        const hasError = errors[field];
        const shouldShow = this.state.touchedexperience[field];
        return hasError ? shouldShow : false;
    };

    return (
        <div>
         <div className = "pv-entity__actions" data-toggle="modal" data-target={'#experienceeditmodal'+id}><FontAwesomeIcon icon="pencil-alt" color="#0073b1" size ="lg"/></div>
           <div className="modal fade  bd-example-modal-lg" id={'experienceeditmodal'+id} tabIndex="-1" role="dialog" aria-labelledby={'experiencemodallabel'+id} aria-hidden="true"  style = {{marginTop : "40px"}}>
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id={'experiencemodallabel'+id}>Edit Experience</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            &times;
                            </button>
                        </div>
                        <div className="modal-body">
                        <label htmlFor="position-title-typeahead" className="mb1 required">Title</label>
                        <input className = "form-control" id="position-title-typeahead" value = {title}  onChange = {this.changeHandler}  onBlur={this.handleBlur('title')} name = "title" placeholder="Ex: Manager" maxLength="100" type="text"/>
                        {shouldMarkError('title') ? <div className = "col-xs-6 col-md-6" style = {{color: "red"}}>&nbsp;Title is a required field</div> : (null)}

                        <label htmlFor="position-company-typeahead" className="mb1 required">Company</label>
                        <input className = "form-control" id="position-company-typeahead" value = {company}  onChange = {this.changeHandler}  onBlur={this.handleBlur('company')} name = "company" placeholder="Ex: Microsoft" maxLength="100" type="text"/>
                        {shouldMarkError('company') ? <div className = "col-xs-6 col-md-6" style = {{color: "red"}} >&nbsp;Company is a required field</div> : (null)}

                        <label htmlFor="position-location-typeahead" className="mb1 required">Location</label>
                        <input className = "form-control" id="position-location-typeahead" value = {location}  onChange = {this.changeHandler}  onBlur={this.handleBlur('location')} name = "location" placeholder="Ex: London, United Kingdom" maxLength="100" type="text"/>
                        {shouldMarkError('location') ? <div className = "col-xs-6 col-md-6" style = {{color: "red"}} >&nbsp;Location is a required field</div> : (null)}

                        <label htmlFor="position-date-typeahead" className="mb1 required">From</label>
                        <select className = "form-control edit-date" id="position-date-typeahead" value = {fromMonth}  onChange = {this.changeHandler}  onBlur={this.handleBlur('fromMonth')}  name="fromMonth">
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
                        {shouldMarkError('fromMonth') ? <div className = "col-xs-6 col-md-6" style = {{color: "red"}}>&nbsp;Month is a required field</div> : (null)}

                        <select  id="position-start-typeahead" name = "fromYear"   onBlur={this.handleBlur('fromYear')} value = {fromYear} onChange = {this.changeHandler} className = "form-control edit-year">  
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
                        {shouldMarkError('fromYear') ? <div className = "col-xs-6 col-md-6" style = {{color: "red"}} >&nbsp;Year is a required field</div> : (null)}

                        <label htmlFor="position-description-typeahead" className="mb1 required"  >Description</label>
                        <textarea className = "form-control" name = "description" value = {description} onChange = {this.changeHandler} id="position-description-typeahead"/>
                        
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn arteco-btn-save" data-dismiss="modal">Close</button>
                            <button type="submit" className="btn arteco-btn" style = {{width : "150px"}}>Save changes</button>
                        </div>
                        </div>
                    </div>
                </div>
           </div>
        )
    }
}

class EditEducation extends Component {

    constructor(props){
        super(props);
        this.state = {
            school : this.props.education.school,
            degree : this.props.education.degree,
            schoolfromYear : this.props.education.schoolfromYear,
            schooltoYear : this.props.education.schooltoYear,
            description : this.props.education.description,
            id : this.props.id,
            touchededucation : {
                school: false,
                degree: false,
                schoolfromYear : false,
                schooltoYear : false
            },
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.submitEducation = this.submitEducation.bind(this);
    }
    
    submitEducation = () => {
        if (this.handleValidationEducation()) {
            const email = JSON.parse(localStorage.getItem(userConstants.USER_DETAILS)).email;
            var editedEducation = {
                school : this.state.school,
                degree : this.state.degree,
                schoolfromYear : this.state.schoolfromYear,
                schooltoYear : this.state.schooltoYear,
                description : this.state.description
            }
            var educationlist = this.props.educationlist
            educationlist[this.state.id] = editedEducation
            var data = educationlist
            console.log(localStorage.getItem(userConstants.USER_DETAILS));
            this.props.applicantprofileeducation(email, localStorage.getItem(userConstants.AUTH_TOKEN, data)).then(response => {
                console.log("response:", response);
                if(response.payload.status === 200){
                    console.log("Profile Education Updated Successfully")
                }
            })
        }
    } 
    
    changeHandler = (e) => {
        const state = {
          ...this.state,
          [e.target.name]: e.target.value,
          }
        this.setState(state);
    }
    
    handleBlur = (field) => (evt) => {
        this.setState({
            touchededucation: { ...this.state.touchededucation, [field]: true }
        });
    }
    
    handleValidationEducation(){
        let formIsValid = false;
        const errors = validateEducation(this.state.school, this.state.degree, this.state.schoolfromYear, this.state.schooltoYear);
        if(!errors.school && !errors.degree && !errors.schoolfromYear && !errors.schooltoYear){
          formIsValid = true
        }
        return formIsValid;
    }
    
    
    render() {  
        const {id} = this.state;
    
        const errors = validateEducation(this.state.school, this.state.degree, this.state.schoolfromYear, this.state.schooltoYear);
        var shouldMarkError = (field) => {
            const hasError = errors[field];
            const shouldShow = this.state.touchededucation[field];
            return hasError ? shouldShow : false;
        };
    
        return (
            <div>
             <div className = "pv-entity__actions" data-toggle="modal" data-target={'#educationeditmodal'+id}><FontAwesomeIcon icon="pencil-alt" color="#0073b1" size ="lg"/></div>
               <div className="modal fade  bd-example-modal-lg" id={'educationeditmodal'+id} tabIndex="-1" role="dialog" aria-labelledby={'educationmodallabel'+id} aria-hidden="true"  style = {{marginTop : "40px"}}>
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id={'educationmodallabel'+id}>Edit Education</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        &times;
                        </button>
                    </div>
                <div className="modal-body">
                <label htmlFor="position-school-typeahead" className="mb1 required">School</label>
                <input className = "form-control" id="position-school-typeahead" name = "school" value = {this.state.school} onChange = {this.changeHandler}   onBlur={this.handleBlur('school')}  placeholder="Ex: Boston University" maxLength="100" type="text"/>
                {shouldMarkError('school') ? <div className = "col-xs-6 col-md-6" style = {{color: "red"}}>&nbsp;School is a required field</div> : (null)}

                <label htmlFor="position-degree-typeahead" className="mb1 required">Degree</label>
                <input className = "form-control" id="position-degree-typeahead" name = "degree"  value = {this.state.degree}  onChange = {this.changeHandler}  onBlur={this.handleBlur('degree')}  placeholder="Ex: Bachelor's" maxLength="100" type="text"/>
                {shouldMarkError('degree') ? <div className = "col-xs-6 col-md-6" style = {{color: "red"}}>&nbsp;Degree is a required field</div> : (null)}

                <label htmlFor="position-date-typeahead" className="mb1 required">From - To</label>
                <select  id="position-start-typeahead" name = "schoolfromYear"  value = {this.state.schoolfromYear} onChange = {this.changeHandler}  onBlur={this.handleBlur('schoolfromYear')}   className = "form-control edit-year">  
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
                {shouldMarkError('schoolfromYear') ? <div className = "col-xs-6 col-md-6" style = {{color: "red"}}>&nbsp;Start Year is a required field</div> : (null)}

                <select  id="position-end-typeahead" name = "schooltoYear" value = {this.state.schooltoYear}  onBlur={this.handleBlur('schooltoYear')}  onChange = {this.changeHandler} className = "form-control edit-year">  
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
                {shouldMarkError('schooltoYear') ? <div className = "col-xs-6 col-md-6" style = {{color: "red"}}>&nbsp;End Year is a required field</div> : (null)}

                <label htmlFor="position-description-typeahead" className="mb1 required">Description</label>
                <textarea className = "form-control" name = "description" value = {this.state.description} onChange = {this.changeHandler} id="position-description-typeahead"/>
                    </div>
                    <div className="modal-footer">
                    <button type="button" className="btn arteco-btn-save" data-dismiss="modal">Close</button>
                    <button type="submit" className="btn arteco-btn" style = {{width : "150px"}} onClick = {this.submitEducation}>Save changes</button>
                    </div>
                    </div>
                </div>
                </div>
           </div>
            )
        }
}

class Experience extends Component {
    constructor(props){
        super(props);
        this.state = {
            title : "",
            company : "",
            location : "",
            fromMonth : "",
            fromYear : "",
            description : "",
            touchedexperience : {
                title: false,
                company: false,
                location : false,
                fromMonth : false,
                fromYear : false
            },
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.submitExperience = this.submitExperience.bind(this);
    }

    submitExperience = () => {
        if (this.handleValidationExperience()) {
            const email = JSON.parse(localStorage.getItem(userConstants.USER_DETAILS)).email;
            var newExperience = {
                title : this.state.title,
                company : this.state.company,
                location : this.state.location,
                fromMonth : this.state.fromMonth,
                fromYear : this.state.fromYear,
                description : this.state.description
            }
            var experiencelist = this.props.experiencelist
            var data = experiencelist.push(newExperience)
            console.log(localStorage.getItem(userConstants.USER_DETAILS));
            this.props.applicantprofileexperience(email, localStorage.getItem(userConstants.AUTH_TOKEN, data)).then(response => {
                console.log("response:", response);
                if(response.payload.status === 200){
                    console.log("Profile Experience Updated Successfully")
                }
            })
        }
    } 

    changeHandler = (e) => {
        const state = {
          ...this.state,
          [e.target.name]: e.target.value,
          }
        this.setState(state);
    }


    handleBlur = (field) => (evt) => {
        this.setState({
            touchedexperience: { ...this.state.touchedexperience, [field]: true }
        });
    }

    handleValidationExperience(){
        let formIsValid = false;
        const errors = validateExperience(this.state.title,  this.state.company, this.state.location, this.state.fromMonth, this.state.fromYear);
        if(!errors.title && !errors.company && !errors.location && !errors.fromMonth && !errors.fromYear){
          formIsValid = true
        }
        return formIsValid;
      }


    render() {
        const errors = validateExperience(this.state.title, this.state.company, this.state.location, this.state.fromMonth, this.state.fromYear);
        var shouldMarkError = (field) => {
            const hasError = errors[field];
            const shouldShow = this.state.touchedexperience[field];
            return hasError ? shouldShow : false;
        };

        return (
        <div>
         <div className = "pv-entity__actions" data-toggle="modal" data-target="#experiencemodal"><FontAwesomeIcon icon="plus" color="#0073b1" size ="lg"/></div>
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
                        <input className = "form-control" id="position-title-typeahead" value = {this.state.title} onChange = {this.changeHandler}  onBlur={this.handleBlur('title')} name = "title" placeholder="Ex: Manager" maxLength="100" type="text"/>
                        {shouldMarkError('title') ? <div className = "col-xs-6 col-md-6" style = {{color: "red"}}>&nbsp;Title is a required field</div> : (null)}

                        <label htmlFor="position-company-typeahead" className="mb1 required">Company</label>
                        <input className = "form-control" id="position-company-typeahead" value = {this.state.company} onChange = {this.changeHandler}  onBlur={this.handleBlur('company')} name = "company" placeholder="Ex: Microsoft" maxLength="100" type="text"/>
                        {shouldMarkError('company') ? <div className = "col-xs-6 col-md-6" style = {{color: "red"}} >&nbsp;Company is a required field</div> : (null)}

                        <label htmlFor="position-location-typeahead" className="mb1 required">Location</label>
                        <input className = "form-control" id="position-location-typeahead" value = {this.state.location} onChange = {this.changeHandler}  onBlur={this.handleBlur('location')}  name = "location" placeholder="Ex: London, United Kingdom" maxLength="100" type="text"/>
                        {shouldMarkError('location') ? <div className = "col-xs-6 col-md-6" style = {{color: "red"}} >&nbsp;Location is a required field</div> : (null)}

                        <label htmlFor="position-date-typeahead" className="mb1 required">From</label>
                        <select className = "form-control edit-date" id="position-date-typeahead" value = {this.state.fromMonth} onChange = {this.changeHandler}   onBlur={this.handleBlur('fromMonth')} name="fromMonth">
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
                        {shouldMarkError('fromMonth') ? <div className = "col-xs-6 col-md-6" style = {{color: "red"}}>&nbsp;Month is a required field</div> : (null)}

                        <select  id="position-start-typeahead" name = "fromYear"  value = {this.state.fromYear} onChange = {this.changeHandler}  onBlur={this.handleBlur('fromYear')} className = "form-control edit-year">  
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
                        {shouldMarkError('fromYear') ? <div className = "col-xs-6 col-md-6" style = {{color: "red"}} >&nbsp;Year is a required field</div> : (null)}

                        <label htmlFor="position-description-typeahead" className="mb1 required"  >Description</label>
                        <textarea className = "form-control" name = "description" value = {this.state.description} onChange = {this.changeHandler} id="position-description-typeahead"/>
                        
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn arteco-btn-save" data-dismiss="modal">Close</button>
                            <button type="submit" className="btn arteco-btn" style = {{width : "150px"}} onClick = {this.submitExperience}>Save changes</button>
                        </div>
                        </div>
                    </div>
                </div>
           </div>
        )
    }
}


class Education extends Component {
    constructor(props){
        super(props);
        this.state = {
            school : "",
            degree : "",
            schoolfromYear : "",
            schooltoYear : "",
            description : "",
            touchededucation : {
                school: false,
                degree: false,
                schoolfromYear : false,
                schooltoYear : false
            },
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.submitEducation = this.submitEducation.bind(this);
    }

    submitEducation = () => {
        if (this.handleValidationEducation()) {
            const email = JSON.parse(localStorage.getItem(userConstants.USER_DETAILS)).email;
            var newEducation = {
                school : this.state.school,
                degree : this.state.degree,
                schoolfromYear : this.state.schoolfromYear,
                schooltoYear : this.state.schooltoYear,
                description : this.state.description
            }
            var educationlist = this.props.educationlist
            var data = educationlist.push(newEducation)
            console.log(localStorage.getItem(userConstants.USER_DETAILS));
            this.props.applicantprofileeducation(email, localStorage.getItem(userConstants.AUTH_TOKEN, data)).then(response => {
                console.log("response:", response);
                if(response.payload.status === 200){
                    console.log("Profile Education Updated Successfully")
                }
            })
        }
    } 

    changeHandler = (e) => {
        const state = {
          ...this.state,
          [e.target.name]: e.target.value,
          }
        this.setState(state);
    }


    handleBlur = (field) => (evt) => {
        this.setState({
            touchededucation: { ...this.state.touchededucation, [field]: true }
        });
    }

    handleValidationEducation(){
        let formIsValid = false;
        const errors = validateEducation(this.state.school, this.state.degree, this.state.schoolfromYear, this.state.schooltoYear);
        if(!errors.school && !errors.degree && !errors.schoolfromYear && !errors.schooltoYear){
          formIsValid = true
        }
        return formIsValid;
      }


    render() {
        const errors = validateEducation(this.state.school, this.state.degree, this.state.schoolfromYear, this.state.schooltoYear);
        var shouldMarkError = (field) => {
            const hasError = errors[field];
            const shouldShow = this.state.touchededucation[field];
            return hasError ? shouldShow : false;
        };

        return (
        <div>
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
                <input className = "form-control" id="position-school-typeahead" name = "school" value = {this.state.school} onChange = {this.changeHandler}   onBlur={this.handleBlur('school')}  placeholder="Ex: Boston University" maxLength="100" type="text"/>
                {shouldMarkError('school') ? <div className = "col-xs-6 col-md-6" style = {{color: "red"}}>&nbsp;School is a required field</div> : (null)}

                <label htmlFor="position-degree-typeahead" className="mb1 required">Degree</label>
                <input className = "form-control" id="position-degree-typeahead" name = "degree"  value = {this.state.degree}  onChange = {this.changeHandler}  onBlur={this.handleBlur('degree')}  placeholder="Ex: Bachelor's" maxLength="100" type="text"/>
                {shouldMarkError('degree') ? <div className = "col-xs-6 col-md-6" style = {{color: "red"}}>&nbsp;Degree is a required field</div> : (null)}

                <label htmlFor="position-date-typeahead" className="mb1 required">From - To</label>
                <select  id="position-start-typeahead" name = "schoolfromYear"  value = {this.state.schoolfromYear} onChange = {this.changeHandler}  onBlur={this.handleBlur('schoolfromYear')}   className = "form-control edit-year">  
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
                {shouldMarkError('schoolfromYear') ? <div className = "col-xs-6 col-md-6" style = {{color: "red"}}>&nbsp;Start Year is a required field</div> : (null)}

                <select  id="position-end-typeahead" name = "schooltoYear" value = {this.state.schooltoYear}  onBlur={this.handleBlur('schooltoYear')}  onChange = {this.changeHandler} className = "form-control edit-year">  
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
                {shouldMarkError('schooltoYear') ? <div className = "col-xs-6 col-md-6" style = {{color: "red"}}>&nbsp;End Year is a required field</div> : (null)}

                <label htmlFor="position-description-typeahead" className="mb1 required">Description</label>
                <textarea className = "form-control" name = "description" value = {this.state.description} onChange = {this.changeHandler} id="position-description-typeahead"/>
                    </div>
                    <div className="modal-footer">
                    <button type="button" className="btn arteco-btn-save" data-dismiss="modal">Close</button>
                    <button type="submit" className="btn arteco-btn" style = {{width : "150px"}} onClick = {this.submitEducation}>Save changes</button>
                    </div>
                    </div>
                </div>
                </div>
            <div className = "pv-entity__actions" data-toggle="modal" data-target="#educationmodal"><FontAwesomeIcon icon="plus" color="#0073b1" size ="lg"/></div>
           </div>
        )
    }
}

function validateprofile(firstname, lastname, state, zipcode) {
    // true means invalid, so our conditions got reversed
    return {
      firstname: firstname.length === 0, 
      lastname: lastname.length === 0,
      state: state.length === 0,
      zipcode: zipcode.length === 0,
    };
}

function validateExperience(title, company, location, fromMonth, fromYear ) {
    // true means invalid, so our conditions got reversed
    return {
        title : title.length === 0, 
        company : company.length === 0, 
        location : location.length === 0, 
        fromMonth : fromMonth.length === 0,
        fromYear : fromYear.length === 0, 
    };
}

function validateEducation(school, degree, schoolfromYear, schooltoYear) {
    // true means invalid, so our conditions got reversed
    return {
        school : school.length === 0, 
        degree : degree.length === 0, 
        schoolfromYear : schoolfromYear.length === 0, 
        schooltoYear : schooltoYear.length === 0    
    };
}

function mapStateToProps(state) {
    return {
        getapplicantprofile: state.getapplicantprofile,
        applicantprofilesummary : state.applicantprofilesummary, 
        applicantprofileexperience : state.applicantprofileexperience, 
        applicantprofileeducation :  state.applicantprofileeducation, 
        applicantprofileskills : state.applicantprofileskills
    };
}

export default withRouter(reduxForm({
form: "Applicant_profile"
})(connect(mapStateToProps, { getapplicantprofile, applicantprofilesummary, applicantprofileexperience, applicantprofileeducation, applicantprofileskills })(Profile)));