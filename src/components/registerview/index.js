import React, { Component } from 'react';
import AccountPearl from '../../pearls/account';

class RegisterView extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            first_name: "",
            last_name: "",
            username: "",
            password: "",
            address: "",
            insurance: "",
            birth_date: "",
            err: ""
        };
        this.AccountPearl = new AccountPearl();
    }
    register() {
        const registerInfo = Object.assign({}, this.state);
        delete registerInfo.err;
        this.AccountPearl.register(registerInfo, (err) => {
            this.setState({
                err: err
            });
        });
    }
    setAttribute(attr, evt) {
        const stateObj = {};
        stateObj[attr] = evt.target.value;
        this.setState(stateObj);
    }
    render() {
        return (
            <div className="RegisterView flex flex-col h-full justify-center items-center bg-grey-lightest">
                <h1 className={"py-8 text-teal"}>Yaro</h1>
                <p className={(this.state.err.length > 0 ? "pb-4 text-red" : "hidden")}>{this.state.err}</p>
                <input placeholder={"First Name"} autoFocus={true} value={this.state.first_name} onChange={(evt) => this.setAttribute('first_name', evt)} type={"text"} className={"px-4 py-2 bg-transparent text-teal my-2 rounded border-2 border-teal focus:outline-none"}/>
                <input placeholder={"Last Name"} value={this.state.last_name} onChange={(evt) => this.setAttribute('last_name', evt)} type={"text"} className={"px-4 py-2 bg-transparent text-teal my-2 rounded border-2 border-teal focus:outline-none"}/>
                <input placeholder={"Username"} value={this.state.username} onChange={(evt) => this.setAttribute('username', evt)} type={"text"} className={"px-4 py-2 bg-transparent text-teal my-2 rounded border-2 border-teal focus:outline-none"}/>
                <input placeholder={"Password"} value={this.state.password} onChange={(evt) => this.setAttribute('password', evt)} type={"password"} className={"px-4 py-2 bg-transparent text-teal my-2 rounded border-2 border-teal focus:outline-none"}/>
                <input placeholder={"Address"} value={this.state.address} onChange={(evt) => this.setAttribute('address', evt)} type={"text"} className={"px-4 py-2 bg-transparent text-teal my-2 rounded border-2 border-teal focus:outline-none"}/>
                <input placeholder={"Insurance"} value={this.state.insurance} onChange={(evt) => this.setAttribute('insurance', evt)} type={"text"} className={"px-4 py-2 bg-transparent text-teal my-2 rounded border-2 border-teal focus:outline-none"}/>
                <input placeholder={"Birth Date"} value={this.state.birth_date} onChange={(evt) => this.setAttribute('birth_date', evt)} type={"text"} className={"px-4 py-2 bg-transparent text-teal my-2 rounded border-2 border-teal focus:outline-none"}/>
                <div className={"flex my-4"}>
                    <button onClick={() => this.props.toLogin()} className={"focus:outline-none text-teal px-4 py-2"} >Back</button>
                    <button onClick={() => this.register()} className={"focus:outline-none text-teal ml-8 px-4 py-2"} >Register</button>
                </div>
            </div>
        );
    }
}
export default RegisterView;
