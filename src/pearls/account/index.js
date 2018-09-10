import Pearl from '@ashurson/pearl';
import axios from 'axios';
import LoadingPearl from "../loading";

class AccountPearl extends Pearl {
    init() {
        this.LoadingPearl = new LoadingPearl();
        this.setState({
            isLoggedIn: false,
            firstName: null,
            lastName: null,
            username: null,
            token: null
        });
    }
    login(username, password, fallback) {
        this.LoadingPearl.setState({ isLoading: true});
        // axios.post('http://167.99.107.141/api/authenticate', {
        axios.post('http://localhost:5000/auth/login', {
            username: username,
            password: password
        })
        .then((response) => {
            if (response.data.success) {
                this.setState({
                    isLoggedIn: true,
                    firstName: response.data.first_name,
                    lastName: response.data.last_name,
                    username: response.data.username,
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
    }
}
export default AccountPearl;