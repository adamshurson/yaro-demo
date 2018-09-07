import React, { Component } from 'react';
import Logo from '../logo';
import LoadingPearl from '../../pearls/loading';
class Loader extends Component {
    constructor() {
        super();
        this.state = {
            shouldDisplay: true
        };
    }
    componentDidMount() {
        this.LoadingPearl = new LoadingPearl();
        this.LoadingPearl.subscribe( (newState) => {
            this.setState({
                shouldDisplay: newState.isLoading
            });
        });
    }
    render() {
        return (
            <div className={ (this.state.shouldDisplay ? "" : "hidden") + " Loader absolute pin flex justify-center items-center bg-brown"}>
                <Logo />
            </div>
        );
    }
}
export default Loader;
