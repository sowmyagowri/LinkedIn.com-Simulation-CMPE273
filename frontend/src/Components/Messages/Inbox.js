import Navbar from '../NavBar/Navbar';
import React, { Component } from 'react';
import './Inbox.css';
class Inbox extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div class="user-inbox">
                <Navbar></Navbar>
                <div class="content">
                    <div class="master">
                        {this.renderMessageList()}
                    </div>
                    <div class="detail">
                        {this.renderConversations()}
                    </div>
                </div>
            </div>
        );
    }

    renderMessageList() {
        let conversations = [];
        // if (this.props.conversations && this.props.conversations.length > 0) {
        let message = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        message.map((conversation, index) => {
            conversations.push(
                <div class="message" key={index} onClick={this.viewConversation.bind(this, conversation)}>
                    <img src="/images/avatar.png" />
                    <h5>{'Yash Mahajan' + index}</h5>
                </div>
            );
        });
        return conversations;
        // }
        // else {
        //     return (
        //         <h4>No Messages Yet !</h4>
        //     );
        // }
    }

    viewConversation(conversation) {

    }

    renderConversations() {
        return (
            <div class="conversation">
                <div class="conversation-list">
                </div>
                <div class="input-message">
                    <textarea rows="6" cols="40" required maxlength="10000" class="form-control" onChange={(event) => { }}
                        name="message" placeholder="Enter Message"></textarea>
                    <button className='btn btn-primary' onClick={this.sendMessage.bind(this)}>Send</button>
                </div>
            </div>
        );
    }

    renderMessage(){
        return(
            <div></div>
        );
    }

    sendMessage(){

    }
}

export default Inbox;