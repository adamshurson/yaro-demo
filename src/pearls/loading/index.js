import Pearl from '@ashurson/pearl';
class LoadingPearl extends Pearl {
    constructor() {
        super('LoadingPearl', function() {
            this.state = {
                isLoading: false
            };
        });
    }
}
export default LoadingPearl;