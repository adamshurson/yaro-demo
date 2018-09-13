import Pearl from '@ashurson/pearl';

// this pearl is used for managing the current visit state
// if i have time, i'd love to change the visit details page
// so that it only renders with props and is stateless.
// that way, this pearl can be removed
class VisitPearl extends Pearl {
    constructor() {
        super('VisitPearl', function() {
            this.state = {
                visit: {}
            };
        });
    }
}
export default VisitPearl;