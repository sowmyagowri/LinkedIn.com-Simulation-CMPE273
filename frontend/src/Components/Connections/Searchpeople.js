import React, {Component} from 'react';
import '../../App.css';
import '../../jobsearch_wrapper.css';
import './connections.css';
import Navbar from '../NavBar/Navbar';
import { reduxForm } from "redux-form";
import { withRouter} from 'react-router-dom';
import { connect } from "react-redux";
import { userConstants } from '../../constants';
import { makeconnections } from '../../Actions/action_connections';

class SearchPeople extends Component{
    constructor(props){
        super(props);
        this.state = {
            searchresults : "",
            isLoading : false,
            filteredResults : [{
                profilePicture : "/images/avatar.png",
                firstName : "Akhi",
                lastName : "Anand",
                description : "Senior Accountant at asfasfasff",
                email : "akhi@gmail.com"
            },{
                profilePicture : "/images/avatar.png",
                firstName : "Nrupa",
                lastName : "Chitley",
                description : "Senior Accountant at asfasfasff",
                email : "replica.recruiter@sjsu.edu"
            }]
        };
        this.sendRequest = this.sendRequest.bind(this)
    }

    componentDidMount() {
        //call to action
        const token =  JSON.parse(localStorage.getItem(userConstants.AUTH_TOKEN));
        this.setState ({
            searchresults : this.state.filteredResults.length
        })
    }


    sendRequest = (event, i) => {
        const email = JSON.parse(localStorage.getItem(userConstants.USER_DETAILS)).email;
        const token =  JSON.parse(localStorage.getItem(userConstants.AUTH_TOKEN));
        var data = {
            receiver : {
                username: this.state.filteredResults[i].email,
                firstname: this.state.filteredResults[i].firstName,
                lastname: this.state.filteredResults[i].lastName
            }
        }
        console.log(data)

        this.props.makeconnections(data, token).then(response => {
            console.log("response:", response);
            if(response.payload.status === 200){
                console.log("Send Request Successfully")
                
            }
        })
    }

    listUsers () {
        var self = this;
        const {filteredResults, isLoading} = this.state;
        if(!isLoading) {
            return Object.keys(filteredResults).map(function(i) {
                return <div key ={i}>
                <ul className = "mn-invitations-preview__header">
                    <li className = "invitation-card1 ember-view">
                        <div className = "invitation-card__info-wrapper">
                            <div className = "invitation-card__details">
                                <div className = "details-view">
                                <div className = "msg-conversation-card__row pr2">
                                    <img alt="" src={filteredResults[i].profilePicture} style = {{width : "56px", height : "56px"}}/>
                                    <div className = "row" style = {{marginLeft : "15px"}}>
                                        <div className = "form-group">
                                            <h5 className = "t-14 t-black t-normal">{filteredResults[i].firstName}&nbsp;{filteredResults[i].lastName}</h5>
                                            <h5 className = "t-12 t-black--light t-normal">{filteredResults[i].description}</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className = "invitation-card__action-container pl3 pr5">
                                        <button type="button" className="btn arteco-btn" style = {{width : "150px"}} onClick = {(event) => self.sendRequest(event,i)}>Send Request</button>
                                        <button type="button" className="btn arteco-btn-save" style={{ marginLeft: "10px", width : "100px" }}>Message</button>
                                </div>  
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            })
        }
    }
    

    render(){
        return (
            <div className="jobsearch-wrapper">
                <Navbar></Navbar>
                <div className = "neptune-grid1" style = {{marginTop : "70px"}}>
                    <div className = "core-rail" style = {{width : "900px"}}>
                        <div className ="mn-invitations-preview mb4 artdeco-card ember-view">
                            <header className = "artdeco-card__header mn-invitations-preview__header">
                            <h3 className = "t-13 t-black--light t-normal">Showing&nbsp;{this.state.searchresults}&nbsp;results</h3></header>
                            {this.listUsers()}
                        </div>
                    </div>
                </div>
             </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        makeconnections: state.makeconnections
    };
}

export default withRouter(reduxForm({
form: "Search_People"
})(connect(mapStateToProps, { makeconnections })(SearchPeople)));