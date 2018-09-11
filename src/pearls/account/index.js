import Pearl from '@ashurson/pearl';
import axios from 'axios';
import LoadingPearl from "../loading";

class AccountPearl extends Pearl {
    constructor() {
        super('AccountPearl', function() {
            this.LoadingPearl = new LoadingPearl();
            // check if production or not
            if (window.location.href === 'http://localhost:3000/') {
                this.rootUrl = 'http://localhost:5000/auth';
            } else {
                this.rootUrl = 'http://167.99.107.141/api/auth';
            }
            this.state = {
                isLoggedIn: false,
                userObject: null,
                token: null
            };
            this.login = function(username, password, fallback) {
                this.LoadingPearl.setState({ isLoading: true});
                axios.post(this.rootUrl + '/login', {
                    username: username,
                    password: password
                })
                    .then((response) => {
                        if (response.data.success) {
                            this.setState({
                                isLoggedIn: true,
                                userObject: response.data.userObject,
                                token: response.data.token
                            });
                        } else {
                            fallback(response.data.err);
                        }
                        this.LoadingPearl.setState({ isLoading: false});
                    })
                    .catch((error) => {
                        console.log("Unexpected error: " + error);
                        this.LoadingPearl.setState({ isLoading: false});
                    });
            };
            this.register = function(data, fallback) {
                this.LoadingPearl.setState({ isLoading: true});
                axios.post(this.rootUrl + '/register', data)
                    .then((response) => {
                        if (response.data.success) {
                            this.setState({
                                isLoggedIn: true,
                                userObject: response.data.userObject,
                                token: response.data.token
                            });
                        } else {
                            fallback(response.data.err);
                        }
                        this.LoadingPearl.setState({ isLoading: false});
                    })
                    .catch((error) => {
                        console.log("Unexpected error: " + error);
                        this.LoadingPearl.setState({ isLoading: false});
                    });
            };
        });
    }
}
export default AccountPearl;