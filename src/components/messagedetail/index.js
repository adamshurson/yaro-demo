import React from 'react';

class MessageDetail extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    getMessageType() {
        if (this.props.message.senderType === 'user') {
            return "To: ";
        } else if (this.props.message.senderType === 'doctor') {
            return "From: ";
        }
    }

    render() {
        return (
            <div className="MessageDetail flex flex-col p-4 h-full overflow-hidden">
                <div
                    className="p-4 mt-4 text-teal flex items-center rounded shadow-md bg-white hover:shadow-lg">
                    <h4>{this.getMessageType() + this.props.message.doctor.profile.first_name + " " + this.props.message.doctor.profile.last_name}</h4>
                    <h4 className="ml-auto">{(new Date(this.props.message.date)).toUTCString()}</h4>
                </div>
                <div className="flex-1 p-4 mt-4 text-teal rounded shadow-md bg-white hover:shadow-lg overflow-y-scroll">
                    {this.props.message.content}
                </div>
                <button className="p-4 mt-4 text-teal flex items-center justify-center rounded focus:outline-none shadow-md bg-white hover:shadow-lg hover:bg-teal hover:text-white"
                    onClick={() => this.props.setPage('messages')}>Back
                </button>
            </div>
        );
    }
}
export default MessageDetail;