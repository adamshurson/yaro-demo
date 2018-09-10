import Pearl from '@ashurson/pearl';

class ScrollPearl extends Pearl {
    init() {
        this.setState({
            isAllowed: true
        });
    }
    preventScroll() {
        this.setState({
            isAllowed: false
        });
    }
    allowScroll() {
        this.setState({
            isAllowed: true
        });
    }
}
export default ScrollPearl;