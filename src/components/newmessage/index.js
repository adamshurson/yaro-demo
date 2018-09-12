import React from 'react';
import AccountPearl from "../../pearls/account";
import axios from "axios";

class NewMessage extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            user: 0,
            doctor: 0,
            doctors: [],
            content: ""
        };
        // check if production or not
        if (window.location.href === 'http://localhost:3000/') {
            this.rootUrl = 'http://localhost:5000';
        } else {
            this.rootUrl = 'http://167.99.107.141/api';
        }
    }
    componentDidMount() {
        this.AccountPearl = new AccountPearl();
        this.AccountPearl.subscribe((newState) => {
            this.setState({
                user: newState.userObject._id
            });
        });
        axios.get(this.rootUrl + '/doctors/get')
            .then((response) => {
                if (response.data.success) {
                    this.setState({
                        doctors: response.data.doctors
                    });
                } else {
                    console.log(response.data.err);
                }
            })
            .catch((error) => {
                console.log("Unexpected error: " + error);
            });
    }
    sendMessage() {
        const newMessage = {
            user: this.state.user,
            doctor: this.state.doctor,
            content: this.state.content,
            date: new Date(),
            senderType: 'user'
        };
        axios.post(this.rootUrl + '/messages/create', newMessage)
            .then((response) => {
                if (response.data.success) {
                    this.props.setPage('messages');
                } else {
                    console.log(response.data.err);
                }
            })
            .catch(function(error) {
                console.log("Unexpected error: " + error);
            });
    }
    render() {
        return (
            <div className="NewMessage flex flex-col p-4 h-full overflow-hidden">
                <select value={this.state.doctor} onChange={(evt) => this.setState({doctor: evt.target.value})} className={"p-4 text-teal rounded focus:outline-none shadow-md bg-white hover:shadow-lg"}>
                    <option value={0}>Select a Doctor</option>
                    {
                        this.state.doctors.map((doc) => {
                            return <option key={doc._id} value={doc._id}>{doc.profile.first_name + " " + doc.profile.last_name}</option>
                        })
                    }
                </select>
                <textarea placeholder="Write your message..." className="flex-1 p-4 mt-4 text-teal rounded focus:outline-none shadow-md bg-white hover:shadow-lg" value={this.state.content} onChange={(evt) => this.setState({content: evt.target.value})} />
                <button className="p-4 mt-4 text-teal flex items-center justify-center rounded focus:outline-none shadow-md bg-white hover:shadow-lg hover:bg-teal hover:text-white" onClick={() => this.sendMessage()}>Send</button>
            </div>
        );
    }
}
export default NewMessage;