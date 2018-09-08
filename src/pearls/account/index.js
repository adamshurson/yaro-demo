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
    login(username, password) {
        this.LoadingPearl.setState({ isLoading: true});
        axios.post('http://167.99.107.141/api/authenticate', {
            name: username,
            password: password
        })
        .then((response) => {
            setTimeout(() => {
                this.setState({
                    isLoggedIn: true,
                    firstName: "Adam",
                    lastName: "Shurson",
                    username: "ashurson",
                    token: response.data.token
                });
                this.LoadingPearl.setState({ isLoading: false});
            }, 500);
        })
        .catch((error) => {
            console.log(error);
            this.LoadingPearl.setState({ isLoading: false});
        });
        this.setState({
            isLoggedIn: true,
            firstName: "Adam",
            lastName: "Shurson",
            username: "ashurson",
            token: "test"
        });
    }
}
export default AccountPearl;