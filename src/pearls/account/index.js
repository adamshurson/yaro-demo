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
                userObject: localStorage.getItem('userObject'),
                token: localStorage.getItem('token')
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
                            localStorage.setItem('token', response.data.token);
                            localStorage.setItem('userObject', JSON.stringify(response.data.userObject));
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
            this.authorizeToken = function(token) {
                this.LoadingPearl.setState({ isLoading: true});
                axios.post(this.rootUrl + '/authorizeToken', {
                    token: token
                })
                    .then((response) => {
                        if (response.data.success) {
                            this.setState({
                                isLoggedIn: true,
                                token: response.data.token
                            });
                            localStorage.setItem('token', response.data.token);
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
            this.logout = function() {
                localStorage.removeItem('token');
                localStorage.removeItem('userObject');
                this.setState({
                    userObject: {},
                    token: null,
                    isLoggedIn: false
                });
            };
            if (localStorage.getItem('token') !== null) {
                this.authorizeToken(localStorage.getItem('token'));
            }
        });
    }
}
export default AccountPearl;