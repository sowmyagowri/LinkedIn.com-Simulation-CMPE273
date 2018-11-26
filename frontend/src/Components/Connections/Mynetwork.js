import React, {Component} from 'react';
import '../../App.css';
import '../../jobsearch_wrapper.css';
import './connections.css';
import Navbar from '../NavBar/Navbar';

class Mynetwork extends Component{
    constructor(props){
        super(props);
        this.state = {
            totalinvitations : 11,
            totalconnections : 12
        };
    }

    componentDidMount() {
        //call to action
    }
    

    render(){
        return (
            <div className="jobsearch-wrapper">
                <Navbar></Navbar>
                <div className = "neptune-grid1" style = {{marginTop : "70px"}}>
                    <div className = "left-rail">
                        <div className ="sticky ember-view">
                        <div className = "left-rail-container ">
                            <div className = "mn-connections-summary container-with-shadow ember-view">
                            <h3 className = "t-13 t-black t-normal">Connections&nbsp;({this.state.totalconnections})</h3>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className = "core-rail">
                        <div className ="mn-invitations-preview mb4 artdeco-card ember-view">
                            <header className = "artdeco-card__header mn-invitations-preview__header">
                            <h3 className = "t-16 t-black t-normal">Invitations&nbsp;({this.state.totalinvitations})</h3></header>
                            <ul className = "mn-invitations-preview__header">
                                <li className = "invitation-card ember-view">
                                    <div className = "invitation-card__info-wrapper">
                                        <div className = "invitation-card__details">
                                            <div className = "details-view">
                                            <div className = "msg-conversation-card__row pr2">
                                                <img alt="" src="/images/avatar.png" style = {{width : "56px", height : "56px"}}/>
                                                <div className = "row" style = {{marginLeft : "15px"}}>
                                                    <div className = "form-group">
                                                        <h5 className = "t-14 t-black t-normal">Vince Denver</h5>
                                                        <h5 className = "t-12 t-black--light t-normal">Senior Accountant at asfasfasff</h5></div>
                                                </div>
                                            </div>
                                            <div className = "invitation-card__action-container pl3 pr5">
                                                    <button type="submit" className="btn arteco-btn-save">Ignore</button>
                                                    <button type="submit" className="btn arteco-btn" style={{ marginLeft: "10px" }}>Accept</button>
                                            </div>  
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <ul className = "mn-invitations-preview__header">
                                <li className = "invitation-card ember-view">
                                    <div className = "invitation-card__info-wrapper">
                                        <div className = "invitation-card__details">
                                            <div className = "details-view">
                                            <div className = "msg-conversation-card__row pr2">
                                                <img alt="" src="/images/avatar.png" style = {{width : "56px", height : "56px"}}/>
                                                <div className = "row" style = {{marginLeft : "15px"}}>
                                                    <div className = "form-group">
                                                        <h5 className = "t-14 t-black t-normal">Vince Denver</h5>
                                                        <h5 className = "t-12 t-black--light t-normal">Senior Accountant at asfasfasff</h5></div>
                                                </div>
                                            </div>
                                            <div className = "invitation-card__action-container pl3 pr5">
                                                    <button type="submit" className="btn arteco-btn-save">Ignore</button>
                                                    <button type="submit" className="btn arteco-btn" style={{ marginLeft: "10px" }}>Accept</button>
                                            </div>  
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
             </div>
        )
    }
}

export default Mynetwork;