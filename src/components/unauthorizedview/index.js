import React, { Component } from 'react';
import LoginView from "../loginview";
import RegisterView from "../registerview";

class UnauthorizedView extends Component {
    constructor() {
        super();
        this.state = {
            view: {
                name: 'Login',
                component: <LoginView toRegister={() => this.toRegister()}/>
            }
        };
    }
    toLogin() {
        this.setState({
            view: {
                name: 'Login',
                component: <LoginView toRegister={() => this.toRegister()}/>
            }
        })
    }
    toRegister() {
        this.setState({
            view: {
                name: 'Register',
                component: <RegisterView toLogin={() => this.toLogin()}/>
            }
        })
    }
    render() {
        return (
            <div className="UnauthorizedView absolute pin flex items-center justify-center">
                {this.state.view.component}
            </div>
        );
    }
}
export default UnauthorizedView;
