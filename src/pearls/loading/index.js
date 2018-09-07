import Pearl from '@ashurson/pearl';
class LoadingPearl extends Pearl {
    init() {
        this.setState({
            isLoading: false
        });
    }
}
export default LoadingPearl;