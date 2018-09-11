import Pearl from '@ashurson/pearl';

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