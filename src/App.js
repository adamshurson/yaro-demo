import React, {Component} from 'react';
import './index.css';
import Loader from './components/loader';
import UnauthorizedView from './components/unauthorizedview';
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
    }
    componentDidMount() {
        setTimeout(() => {
            this.LoadingPearl.setState({
                isLoading: false
            });
        }, 2000);
        this.AccountPearl = new AccountPearl();
        this.LoadingPearl = new LoadingPearl();
        this.LoadingPearl.setState({
            isLoading: true
        });
        this.AccountPearl.subscribe( (newState) => {
           this.setState({
               account: newState
           });
        });
    }
    render() {
        return (
            <div className={"absolute App bg-grey-lightest pin overflow-hidden"}>
                <Loader/>
                { this.state.account.isLoggedIn
                    ? <MainView/>
                    : <UnauthorizedView/>
                }
            </div>
        );
    }
}

export default App;
