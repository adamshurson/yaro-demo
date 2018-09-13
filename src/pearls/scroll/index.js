import Pearl from '@ashurson/pearl';

// this pearl handles scrolling permissions
// used for displaying modals / drop down navigation menu
class ScrollPearl extends Pearl {
    constructor() {
        super('ScrollPearl', function() {
            this.state = {
                isAllowed: true
            };
        });
    }
}
export default ScrollPearl;