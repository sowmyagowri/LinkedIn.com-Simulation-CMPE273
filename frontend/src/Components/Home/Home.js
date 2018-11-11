import React, {Component} from 'react';
import '../../App.css';
import '../../home_wrapper.css';
import { Field, reduxForm } from "redux-form";
import {Redirect, withRouter} from 'react-router-dom';
import { connect } from "react-redux";
import {home} from '../../Actions/home_actions.js';

class Home extends Component{
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
          <div className = "global-wrapper">
              <div className="navbar fixed-top navbar-dark bg-dark" style = {{height : "52px"}}>
                <div className = "home_wrapper">
                <h1><a className="navbar-brand" href="#"><img src = {"/linkedinfulllogo1.png"} alt = "LinkedIn"/></a></h1>
                    <form className = "login-form" method = "POST">
                        <label htmlFor = "login-email">Email</label>
                        <input type = "text" id = "login-email" placeholder ="Email" autoFocus = "autofocus"></input>
                        <label htmlFor = "login-password">Password</label>
                        <input type = "password" id = "login-password" placeholder ="Password" autoFocus = "autofocus"></input>
                        <input className = "login-submit" type ="submit" value = "Sign In"></input>
                        <a className = "link-forgot-password" tabIndex = "1">Forgot Password?</a>
                    </form>
                 </div>
              </div>
              <div className = "main background">
                <form id = "regForm" className = "reg-form">
                    <h2 className = "title">Be great at what you do</h2>
                    <h3 className = "subtitle">Get started - it's free</h3>
                    <section className = "form-body">
                        <label htmlFor ="reg-firstname">First Name</label>
                        <input type = "text" name = "firstName" id = "reg-firstname"></input>
                        <label htmlFor ="reg-lastname">Last Name</label>
                        <input type = "text" name = "lastName" id = "reg-lastname"></input>
                        <label htmlFor ="reg-email">Email</label>
                        <input type = "text" name = "email" id = "reg-email"></input>
                        <label htmlFor ="reg-password">Password(6 or more characters)</label>
                        <input type = "password" name = "password" id = "reg-password"></input>
                        <span className = "agreement">By clicking Join now, you agree to the LinkedIn User Agreement, Privacy Policy, and Cookie Policy.</span>
                        <input id ="registration-submit" className = "registration submit-button" type = "submit" value = "Join now"></input>
                    </section>
                </form>
              </div>
          </div>
        )
    }
}

  function mapStateToProps(state) {
    return { home: state.home };
  }

  export default withRouter(reduxForm({
    form: "Home_Page"
  })(connect(mapStateToProps, {home })(Home)));
  