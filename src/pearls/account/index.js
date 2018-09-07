import Pearl from '@ashurson/pearl';
import LoadingPearl from "../loading";

class AccountPearl extends Pearl {
    init() {
        this.LoadingPearl = new LoadingPearl();
        this.setState({
            isLoggedIn: false,
            firstName: null,
            lastName: null,
            username: null
        });
    }
    login(username, password) {
        this.LoadingPearl.setState({ isLoading: true});
        this.setState({
            isLoggedIn: true,
            firstName: "Adam",
            lastName: "Shurson",
            username: "ashurson"
        });
        this.LoadingPearl.setState({ isLoading: false});
    }
}
export default AccountPearl;