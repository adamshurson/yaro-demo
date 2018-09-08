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
            account: {}
        };
        this.AccountPearl = new AccountPearl();
        this.LoadingPearl = new LoadingPearl();
        this.LoadingPearl.setState({
            isLoading: true
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
            <div className="App bg-grey-lightest w-screen h-screen fixed overflow-hidden">
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
