import Pearl from '@ashurson/pearl';
import axios from 'axios';
import LoadingPearl from "../loading";

// Chances are, pearls are an unknown package to you. They serve as singleton state managers
// that our components can subscribe to in order to keep data flow uni-directional
// and also to share data without passing props all over our react tree

// this pearl takes care of our user account because there are multiple components that require
// that information

class AccountPearl extends Pearl {
    constructor() {
        // super() for pearls takes the classname string and an initialization function
        // you can think of the function you pass as a constructor for the singleton that will
        // only run once
        super('AccountPearl', function() {
            this.LoadingPearl = new LoadingPearl();
            // check if production or not
            if (window.location.href === 'http://localhost:3000/') {
                this.rootUrl = 'http://localhost:5000/auth';
            } else {
                this.rootUrl = 'http://167.99.107.141/api/auth';
            }
            // set the login to false, but check if the userobject or token is stored
            this.state = {
                isLoggedIn: false,
                userObject: localStorage.getItem('userObject'),
                token: localStorage.getItem('token')
            };
            // login to our application, supply a fallback (notice, not a callback) for
            // if this call fails. useful for displaying error messages
            this.login = function(username, password, fallback) {
                // we are loading our data
                this.LoadingPearl.setState({ isLoading: true});
                // send request to our backend
                axios.post(this.rootUrl + '/login', {
                    username: username,
                    password: password
                })
                    .then((response) => {
                        // if we are logged in successfully, then set our state and storage
                        if (response.data.success) {
                            this.setState({
                                isLoggedIn: true,
                                userObject: response.data.userObject,
                                token: response.data.token
                            });
                            localStorage.setItem('token', response.data.token);
                            localStorage.setItem('userObject', JSON.stringify(response.data.userObject));
                        } else {
                            // we want to remove the storage so that we don't call authenticate with
                            // token without having a current token
                            localStorage.removeItem('token');
                            localStorage.removeItem('userObject');
                            fallback(response.data.err);
                        }
                        this.LoadingPearl.setState({ isLoading: false});
                    })
                    .catch((error) => {
                        console.log("Unexpected error: " + error);
                        this.LoadingPearl.setState({ isLoading: false});
                    });
            };
            // if the storage contains a token, try and authenticate using it
            this.authorizeToken = function(token) {
                this.LoadingPearl.setState({ isLoading: true});
                axios.post(this.rootUrl + '/authorizeToken', {
                    token: token
                })
                    .then((response) => {
                        // if the token is still valid, then set up the user object
                        if (response.data.success) {
                            this.setState({
                                isLoggedIn: true,
                                userObject: response.data.userObject
                            });
                            localStorage.setItem('userObject', response.data.userObject);
                        } else {
                            // delete our user and token since it's not valid
                            localStorage.removeItem('token');
                            localStorage.removeItem('userObject');
                        }
                        this.LoadingPearl.setState({ isLoading: false});
                    })
                    .catch((error) => {
                        console.log("Unexpected error: " + error);
                        this.LoadingPearl.setState({ isLoading: false});
                    });
            };
            // register our user, give a fallback for errors / displaying messages
            this.register = function(data, fallback) {
                this.LoadingPearl.setState({ isLoading: true});
                axios.post(this.rootUrl + '/register', data)
                    .then((response) => {
                        // if our user was successfully registered, set our status correctly
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
            // remove our local storage and set the state as such
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