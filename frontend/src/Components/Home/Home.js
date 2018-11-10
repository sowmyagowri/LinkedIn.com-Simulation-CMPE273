import React, {Component} from 'react';
import '../../App.css';
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
          <div>
              <img
              src={"/background.jpg"}
              alt=""
            />
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
  