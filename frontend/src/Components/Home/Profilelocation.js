import React, {Component} from 'react';
import '../../App.css';
import '../../home_wrapper.css';
import '../../profile_wrapper.css';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import {applicantsignup} from '../../Actions';

class ProfileLocation extends Component{
    constructor(props){
        super(props);
        this.state = {
            firstname : "",
            lastname : "",
            email : "",
            password : "",
            state : "",
            zipcode : "",
            message: "",
        };

        //Bind the handlers to this class
        this.changeHandler = this.changeHandler.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
        this.submitSignup = this.submitSignup.bind(this);
    }

    
    componentDidMount() {
        
    }

    componentWillMount() {
        this.setState ({ 
             firstname : this.props.location.state?this.props.location.state.firstname:"",
             lastname : this.props.location.state?this.props.location.state.lastname:"",
             email : this.props.location.state?this.props.location.state.email:"",
             password: this.props.location.state?this.props.location.state.password:""
         })
    }

    changeHandler(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleValidation() {
        return (this.state.zipcode.match(/(^[0-9]{5}(?:-[0-9]{4})?$)/));
    }

    submitSignup(event) {
        //prevent page from refresh
        event.preventDefault();
        this.setState({
            message: ""
        });
        if (this.handleValidation()) {
            const { firstname, lastname, email, password, state, zipcode} = this.state;
            this.props.history.push({
                pathname:"/profileedit/new",
                state:{
                    firstname : firstname,
                    lastname : lastname,
                    email : email,
                    password : password,
                    state : state,
                    zipcode : zipcode
                }
            });
        } else {
            this.setState({
                message: "This is not a valid zipcode"
            })
        }
    }

    render(){
        const { state, zipcode, message} = this.state;
        return(
          <div className = "profilelocation-wrapper">
              <div className="navbar fixed-top">
                <div className = "home_wrapper">
                <h1><a className="navbar-brand" href="#"><img src = {"/images/linkedinfulllogo.png"} alt = "LinkedIn"/></a></h1>
                 </div>
              </div>
              <div className = "main1">
                    <h3 className = "subtitle" style = {{fontSize : "1.4rem", fontWeight: "300"}}>Let's start your profile, connect to people you know, and engage with them on topics you care about.</h3>
                    <section className = "form-body">
                        <label htmlFor ="reg-location" className = "mb1 required">Country/Region</label>
                        <select className = "form-control" onChange = {this.changeHandler} name = "state" value={state} style = {{width : "500px"}} id="reg-location" maxLength="100" type="text">
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
                        <label htmlFor ="reg-zipcode" className = "mb1 required">Postal Code</label>
                        <input className = "form-control" onChange = {this.changeHandler} name = "zipcode" value={zipcode} id="reg-zipcode" pattern="[0-9]{5}" placeholder="Five digit zip code" type="text"/>
                        <input onClick = {this.submitSignup} id ="registration-submit" className = "registration submit-button" type = "submit" value = "Next"></input>
                    </section>
              </div>
          </div>
        )
    }
}

export default ProfileLocation;
  