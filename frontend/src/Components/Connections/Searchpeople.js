import React, {Component} from 'react';
import '../../App.css';
import '../../jobsearch_wrapper.css';
import './connections.css';
import Navbar from '../NavBar/Navbar';

class SearchPeople extends Component{
    constructor(props){
        super(props);
        this.state = {
            searchresults : "",
            isLoading : false,
            filteredResults : [{
                profilePicture : "/images/avatar.png",
                firstName : "Vince",
                lastName : "Denver",
                description : "Senior Accountant at asfasfasff"
            },{
                profilePicture : "/images/avatar.png",
                firstName : "Vince",
                lastName : "Denver",
                description : "Senior Accountant at asfasfasff"
            }]
        };
        this.sendRequest = this.sendRequest.bind(this)
    }

    componentDidMount() {
        //call to action
        this.setState ({
            searchresults : this.state.filteredResults.length
        })
    }


    sendRequest () {
        

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
                                        <button type="submit" className="btn arteco-btn" style = {{width : "150px"}} onClick = {self.sendRequest}>Send Request</button>
                                        <button type="submit" className="btn arteco-btn-save" style={{ marginLeft: "10px", width : "100px" }}>Message</button>
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

export default SearchPeople;