import React, { Component } from 'react';
import AccountPearl from "../../pearls/account";

class LoginView extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            err: ""
        };
        this.AccountPearl = new AccountPearl();
    }
    login() {
        this.AccountPearl.login(this.state.username, this.state.password, (errorMessage) => {
            this.setState({
                err: errorMessage
            });
        });
    }
    setUsername(evt) {
        this.setState({
            username: evt.target.value
        });
    }
    setPassword(evt) {
        this.setState({
            password: evt.target.value
        });
    }
    render() {
        return (
            <div className="LoginView flex flex-col h-full justify-center items-center bg-grey-lightest">
                <h1 className={"py-8 text-teal"}>Yaro</h1>
                <p className={(this.state.err.length > 0 ? "pb-4 text-red" : "hidden")}>{this.state.err}</p>
                <input placeholder={"Username"} autoFocus={true} value={this.state.username} onChange={(evt) => this.setUsername(evt)} type={"text"} className={"px-4 py-2 bg-transparent text-teal my-2 rounded border-2 border-teal focus:outline-none"} autoComplete="usename"/>
                <input placeholder={"Password"} value={this.state.password} onChange={(evt) => this.setPassword(evt)} type={"password"} className={"px-4 py-2 bg-transparent text-teal my-2 rounded border-2 border-teal focus:outline-none"} autoComplete="password"/>
                <div className={"flex my-4"}>
                    <button onClick={() => this.props.toRegister()} className={"focus:outline-none text-teal px-4 py-2"} >Register</button>
                    <button onClick={() => this.login()} className={"focus:outline-none text-teal ml-8 px-4 py-2"} >Log In</button>
                </div>
            </div>
        );
    }
}
export default LoginView;
