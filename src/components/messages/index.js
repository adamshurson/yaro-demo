import React from 'react';
import AccountPearl from "../../pearls/account";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            viewingType: 'sent',
            sent_messages: [],
            received_messages: [],
            token: null,
            userObject: {}
        };
        // check if production or not
        if (window.location.href === 'http://localhost:3000/') {
            this.rootUrl = 'http://localhost:5000/messages';
        } else {
            this.rootUrl = 'http://167.99.107.141/api/messages';
        }
    }
    fetchMessages() {
        axios.post(this.rootUrl + '/get_sent', {token: this.state.token})
            .then((response) => {
                if (response.data.success) {
                    this.setState({
                        sent_messages: response.data.messages
                    });
                } else {
                    console.log(response.data.err);
                }
            })
            .catch(function(err) {
                console.log("Unexpected error: " + err);
            });
        axios.post(this.rootUrl + '/get_received', {token: this.state.token})
            .then((response) => {
                if (response.data.success) {
                    this.setState({
                        received_messages: response.data.messages
                    });
                } else {
                    console.log(response.data.err);
                }
            })
            .catch(function(err) {
                console.log("Unexpected error: " + err);
            });
    }
    componentDidMount() {
        this.AccountPearl = new AccountPearl();
        this.AccountPearl.subscribe((newState) => {
            this.setState({
                token: newState.token,
                userObject: newState.userObject
            }, this.fetchMessages);
        });
    }
    getCurrentMessages() {
        if (this.state.viewingType === 'sent') {
            return this.state.sent_messages;
        } else if (this.state.viewingType === 'received') {
            return this.state.received_messages;
        }
    }
    render() {
        return (
            <div className="Messages flex flex-col">
                <div className="flex items-center justify-center">
                    <div className="w-1/2 max-w-sm p-4 items-center">
                        <div onClick={() => this.setState({viewingType: 'sent'})}
                             className={(this.state.viewingType === 'sent' ? 'text-white bg-teal shadow-lg' : 'text-teal bg-white shadow-md')
                        + " rounded flex items-center justify-center p-4 hover:text-white hover:bg-teal hover:shadow-lg cursor-pointer"}>Sent</div>
                    </div>
                    <div className="w-1/2 max-w-sm p-4 items-center">
                        <div onClick={() => this.setState({viewingType: 'received'})}
                             className={(this.state.viewingType === 'received' ? 'text-white bg-teal shadow-lg' : 'text-teal bg-white shadow-md')
                             + " rounded flex items-center justify-center p-4 hover:text-white hover:bg-teal hover:shadow-lg cursor-pointer"}>Received</div>
                    </div>
                </div>
                <div className="fixed pin-b pin-r p-4 bg-transparent">
                    <div onClick={() => this.props.setPage('new_message')} className="flex cursor-pointer items-center justify-center h-16 w-16 rounded-full bg-white text-teal shadow-md hover:bg-teal hover:text-white hover:shadow-lg">
                        <FontAwesomeIcon icon={"plus"} className="fa-lg" />
                    </div>
                </div>
                <div className="flex flex-wrap">
                    {
                        this.getCurrentMessages().map((message) => {
                            return <div key={message._id} className={"w-full md:w-1/2 lg:w-1/3 p-4"}>
                                <div className="Message bg-white w-full shadow-md hover:shadow-lg rounded p-4 relative">
                                    <div className={"flex pb-4"}>
                                        <h4 className={"text-teal"}>{message.doctor.profile.first_name + " " + message.doctor.profile.last_name}</h4>
                                        <h4 className={"text-teal ml-auto font-normal"}>{(new Date(message.date)).toLocaleDateString()}</h4>
                                    </div>
                                    <h4 className="font-normal">{message.content.substring(0, 100) + "..."}</h4>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        );
    }
}
export default Messages;