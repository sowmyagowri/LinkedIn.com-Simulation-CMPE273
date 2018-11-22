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
                    <div className = "msg-conversations-container__title-row">
                    <h1 className = "ph4 t-14 t-black-light t1-bold">Messaging</h1></div>
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
                    <div className = "msg-conversation-card__row pr2">
                        <img src="/images/avatar.png" style = {{width : "56px", height : "56px"}}/>
                        <div className = "msg-conversation-card__row pr2">
                        <h5 className = "t-14 t-black--light t-normal">{'Yash Mahajan' + index}</h5></div>
                        <div className ="msg-conversation-card__convo-utility t-12">May 17</div>
                    </div>
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
                    <textarea rows="6" cols="40" required maxlength="10000" className="form-control chat-reply" onChange={(event) => { }}
                        name="message" placeholder="Enter Message"></textarea>
                    <button className='btn arteco-btn' onClick={this.sendMessage.bind(this)}>Send</button>
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