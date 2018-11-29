import React, {Component} from 'react';
import '../../App.css';
import '../../jobsearch_wrapper.css';
import './connections.css';
import Navbar from '../NavBar/Navbar';
import { reduxForm } from "redux-form";
import { withRouter} from 'react-router-dom';
import { connect } from "react-redux";
import { userConstants } from '../../constants';
import { getAllConnections, makeconnections } from '../../Actions/action_connections';

class SearchPeople extends Component{
    constructor(props){
        super(props);
        this.state = {
            searchresults : "",
            isLoading : false,
            filteredResults : "",
            connectionResults : [],
        };
        this.sendRequest = this.sendRequest.bind(this)
    }

    componentDidMount() {
        //call to action
        var filteredResults =  [{
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
        this.setState ({
            filteredResults : filteredResults,
            searchresults : filteredResults.length
        })
        const token =  JSON.parse(localStorage.getItem(userConstants.AUTH_TOKEN));
        this.props.getAllConnections(token).then(response => {
            console.log("response:", response);
            if(response.payload.status === 200){
                var connectionResults = []
                var approved = response.payload.data.connections.connectionsApproved
                var incoming = response.payload.data.connections.connectionsIncoming
                var outgoing = response.payload.data.connections.connectionsOutgoing
                if(approved.length > 0) {
                    for (var i = 0; i < approved.length; i++) {
                        connectionResults.push(JSON.parse(JSON.stringify(approved[i].email)))
                    }                }
                if(incoming.length > 0) {
                    for (var i = 0; i < incoming.length; i++) {
                        connectionResults.push(JSON.parse(JSON.stringify(incoming[i].email)))
                    }                }
                if(outgoing.length > 0) {
                    for (var i = 0; i < outgoing.length; i++) {
                        connectionResults.push(JSON.parse(JSON.stringify(outgoing[i].email)))
                    }
                }

                this.setState ({
                    connectionResults : connectionResults
                })
            }   
        })
    }


    sendRequest = (event, i) => {
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
                var receiver =  this.state.filteredResults[i].email
                var connectionResults = this.state.connectionResults
                connectionResults.push(receiver)
                this.setState ({
                    connectionResults : connectionResults
                })
            }
        })
    }

    checkcondition = (email) => {
        var result = this.state.connectionResults.includes(email)
        return result
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
                                        {!self.checkcondition(filteredResults[i].email) ? 
                                        <button type="button" className="btn arteco-btn" style = {{width : "150px"}} onClick = {(event) => self.sendRequest(event,i)}>Send Request</button> 
                                        : (null)}
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
        makeconnections: state.makeconnections,
        getAllConnections : state.getAllConnections
    };
}

export default withRouter(reduxForm({
form: "Search_People"
})(connect(mapStateToProps, { makeconnections, getAllConnections })(SearchPeople)));