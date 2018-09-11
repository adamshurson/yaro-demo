import Pearl from '@ashurson/pearl';

class ScrollPearl extends Pearl {
    constructor() {
        super('ScrollPearl', function() {
            this.state = {
                isAllowed: true
            };
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