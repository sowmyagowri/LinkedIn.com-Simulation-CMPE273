import Navbar from '../NavBar/Navbar';
import React, { Component } from 'react';
import './Inbox.css';
import { connect } from "react-redux";
import { fetchConversations, postMessage } from "../../Actions/action_messages"
import { userConstants } from '../../constants';

class Inbox extends Component {

    state = {
        currentConversation: null,
        messageDraft: ''
    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.fetchConversations();
    }

    componentWillReceiveProps(nextProps) {
        if (!this.state.currentConversation) {
            this.setState({ currentConversation: nextProps.conversations[0] })
        }
        else {
            nextProps.conversations.map((conversation) => {
                console.log(this.state.currentConversation);
                let user1 = this.state.currentConversation.user1.username == conversation.user1.username;
                let user2 = this.state.currentConversation.user2.username == conversation.user2.username;
                console.log(user1, user2);

                if (user1 && user2) {

                    this.setState({ currentConversation: conversation, messageDraft:''});
                }
            });
        }
    }

    render() {
        return (
            <div class="user-inbox">
                <Navbar></Navbar>
                <div class="content">
                    <div class="master">
                        <div class="master-header">
                            <h4>Messaging</h4>
                        </div>
                        <div class="master-content">
                            {this.renderMessageList()}
                        </div>
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
        let user = JSON.parse(localStorage.getItem(userConstants.USER_DETAILS));
        if (this.props.conversations && this.props.conversations.length > 0) {
            this.props.conversations.map((conversation, index) => {
                let sender = user.email === conversation.user1.username ? conversation.user2 : conversation.user1;
                conversations.push(
                    <div class="message" key={index} onClick={this.viewConversation.bind(this, conversation)}>
                        <img src="/images/avatar.png" />
                        <h5>{sender.firstname + ' ' + sender.lastname}</h5>
                    </div>
                );
            });
            return conversations;
        }
        else {
            return (
                <h4>No Messages Yet !</h4>
            );
        }
    }

    viewConversation(conversation) {
        this.setState({ currentConversation: conversation });
    }

    renderConversations() {
        let headerName = '';
        let user = JSON.parse(localStorage.getItem(userConstants.USER_DETAILS));
        if (this.state.currentConversation) {
            let sender = user.email === this.state.currentConversation.user1.username ? this.state.currentConversation.user2 : this.state.currentConversation.user1;
            headerName = sender.firstname + ' ' + sender.lastname;
            return (
                <div class="conversation">
                    <div class="conversation-list">
                        <div class="conversation-header">
                            <img src="/images/avatar.png" width="40px" height="40px" />
                            <h6>{headerName}</h6>
                        </div>
                        <div class="conversation-content">
                            {this.renderMessage()}
                            <div style={{ float: "left", clear: "both" }}
                                ref={(el) => { this.messagesEnd = el; }}>
                            </div>
                        </div>
                    </div>
                    <div class="input-message">
                        <textarea rows="6" cols="40" required maxlength="10000" class="form-control" value={this.state.messageDraft} onChange={(event) => { this.setState({ messageDraft: event.target.value }) }}
                            name="message" placeholder="Enter Message"></textarea>
                        <button className='btn btn-primary btn-lg' onClick={this.sendMessage.bind(this)}>Send</button>
                    </div>
                </div>
            );
        }
        else {
            return (
                <h4>No Messages Yet !</h4>
            );
        }
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    renderMessage() {
        let messages = [];
        let user = JSON.parse(localStorage.getItem(userConstants.USER_DETAILS));
        if (this.state.currentConversation) {
            this.state.currentConversation.messages.map((message, index) => {
                messages.push(
                    <div key={index} class="message-container">
                        <p className={user.email === message.from ? "message-content from-bubble" : "message-content to-bubble"}>{message.message}</p>
                    </div>
                )
            });
        }
        return messages;
    }

    sendMessage() {
        if (this.state.messageDraft.trim().length > 0) {
            let user = JSON.parse(localStorage.getItem(userConstants.USER_DETAILS));
            let sender = user.email === this.state.currentConversation.user1.username ? this.state.currentConversation.user2 : this.state.currentConversation.user1;
            let messageDetails = {
                "receiver": {
                    "username": sender.username,
                    "firstname": sender.firstname,
                    "lastname": sender.lastname
                },
                "message": this.state.messageDraft
            }
            this.props.postMessage(messageDetails);
        }
    }
}

function mapStateToProps(reduxState) {
    const { conversations } = reduxState.conversations;
    return { conversations };
}
export default connect(mapStateToProps, { fetchConversations, postMessage })(Inbox);