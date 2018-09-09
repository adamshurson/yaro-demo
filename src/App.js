import React, {Component} from 'react';
import './index.css';
import Loader from './components/loader';
import LoginView from './components/loginview';
import MainView from './components/mainview';
import LoadingPearl from './pearls/loading';
import AccountPearl from './pearls/account';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

class App extends Component {
    constructor() {
        super();
        this.state = {
            account: {},
            isFocused: false
        };
        this.AccountPearl = new AccountPearl();
        this.LoadingPearl = new LoadingPearl();
        this.LoadingPearl.setState({
            isLoading: true
        });
        document.addEventListener('focusin', (evt) => {
            if(evt.target.tagName === 'INPUT') {
                this.setState({
                    isFocused: true
                });
                window.scrollTo(0,document.body.scrollHeight);
            }
        });
        document.addEventListener('focusout', (evt) => {
            this.setState({
                isFocused: false
            });
        });
    }
    componentDidMount() {
        setTimeout(() => {
            this.LoadingPearl.setState({
                isLoading: false
            });
        }, 2000);
        this.AccountPearl.subscribe( (newState) => {
           this.setState({
               account: newState
           });
        });
    }
    render() {
        return (
            <div className={(this.state.isFocused ? "absolute": "fixed") + " App bg-grey-lightest w-screen h-screen overflow-hidden"}>
                <Loader/>
                { this.state.account.isLoggedIn
                    ? <MainView/>
                    : <LoginView/>
                }
            </div>
        );
    }
}

export default App;
