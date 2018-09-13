import Pearl from '@ashurson/pearl';

// this pearl handles displaying the loading page
// nice to have this so we don't pass down a loading function prop
// to every component

// we start the state at loading because the App.js component will set it to
// not loading after all the components are mounted
class LoadingPearl extends Pearl {
    constructor() {
        super('LoadingPearl', function() {
            this.state = {
                isLoading: true
            };
        });
    }
}
export default LoadingPearl;