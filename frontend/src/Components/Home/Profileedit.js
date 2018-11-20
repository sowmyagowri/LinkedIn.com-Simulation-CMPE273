import React, {Component} from 'react';
import '../../App.css';
import '../../home_wrapper.css';
import '../../profile_wrapper.css';
import { Redirect } from 'react-router';
import { reduxForm } from "redux-form";
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { applicantsignup } from '../../Actions';

class ProfileEdit extends Component{
    constructor(props){
        super(props);
        this.state = {
            firstname : "",
            lastname : "",
            email : "",
            password : "",
            state : "",
            zipcode : "",
            signedUp: false,
        };

        //Bind the handlers to this class
        this.submitSignup = this.submitSignup.bind(this);
    }

    
    componentDidMount() {
        
    }

    componentWillMount() {
        this.setState ({ 
             firstname : this.props.location.state?this.props.location.state.firstname:"",
             lastname : this.props.location.state?this.props.location.state.lastname:"",
             email : this.props.location.state?this.props.location.state.email:"",
             password: this.props.location.state?this.props.location.state.password:"",
             state : this.props.location.state?this.props.location.state.state:"",
             zipcode: this.props.location.state?this.props.location.state.zipcode:""
         })
    }
    
    submitSignup(event) {
        //prevent page from refresh
        event.preventDefault();
       if (this.handleValidation()) {
            const { firstname, lastname, email, password, state, zipcode} = this.state;
            const data = {
                firstname : firstname,
                lastname : lastname,
                email : email,
                password : password,
                state : state,
                zipcode : zipcode,
            }
            this.props.applicantsignup(data).then(response => {
            if(response.payload.status === 200){
                this.setState({
                    signedUp: true
                });
            }
            }).catch (error => {
            console.log("Error is", error);
            })
         } 
    }

    render(){
        let redirectVar = null;
        if( this.state.signedUp ){
            redirectVar = <Redirect to= "/profile"/>
        }
        return(
          <div className = "profilelocation-wrapper">
          {redirectVar}
              <div className="navbar fixed-top">
                <div className = "home_wrapper">
                    <h1>
                        <a className="navbar-brand" href="#">
                            <img src = {"/images/linkedinfulllogo.png"} alt = "LinkedIn"/>
                        </a>
                    </h1>
                </div>
              </div>
              <div className = "main1">
                    <h3 className = "subtitle" style = {{fontSize : "1.4rem", fontWeight: "300"}}>Your Profile helps you discover the right people and opportunities</h3>
                    <section className = "form-body" style ={{marginBottom : "50px"}}>
                    <h2 className = "pv-profile-section__card-heading t-20 t-black t-normal">Experience</h2>
                    <label htmlFor="position-title-typeahead" class="mb1 required">Title</label>
                            <input className = "form-control" id="position-title-typeahead" placeholder="Ex: Manager" maxlength="100" type="text"/>

                            <label htmlFor="position-company-typeahead" class="mb1 required">Company</label>
                            <input className = "form-control" id="position-company-typeahead" placeholder="Ex: Microsoft" maxlength="100" type="text"/>

                            <label htmlFor="position-location-typeahead" class="mb1 required">Location</label>
                            <input className = "form-control" id="position-location-typeahead" placeholder="Ex: London, United Kingdom" maxlength="100" type="text"/>

                            <label htmlFor="position-date-typeahead" class="mb1 required">From</label>
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
                    <hr/>
                    <h2 className = "pv-profile-section__card-heading t-20 t-black t-normal">Education</h2>
                    <label htmlFor="position-school-typeahead" class="mb1 required">School</label>
                            <input className = "form-control" id="position-school-typeahead" placeholder="Ex: Boston University" maxlength="100" type="text"/>

                            <label htmlFor="position-degree-typeahead" class="mb1 required">Degree</label>
                            <input className = "form-control" id="position-degree-typeahead" placeholder="Ex: Bachelor's" maxlength="100" type="text"/>

                            <label htmlFor="position-date-typeahead" class="mb1 required">From - To</label>
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
                                
                    <input id ="registration-submit" onClick = {this.submitSignup} className = "registration submit-button" type = "submit" value = "Agree & Confirm"></input>
                    </section>
              </div>
          </div>
        )
    }
}

function mapStateToProps(state) {
    return { 
        applicantsignup: state.applicantsignup,
    };
  }
  export default withRouter(reduxForm({
    form: "Applicant_Signup_Page"
  })(connect(mapStateToProps, { applicantsignup }) (ProfileEdit) ));