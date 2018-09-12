import React, { Component } from 'react';
import axios from 'axios';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class AddStoredProcedure extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            name: "",
            description: "",
            default_cost: 0.00
        };
        // check if production or not
        if (window.location.href === 'http://localhost:3000/') {
            this.rootUrl = 'http://localhost:5000/stored_procedures';
        } else {
            this.rootUrl = 'http://167.99.107.141/api/stored_procedures';
        }
    }
    addProcedure() {
        axios.post(this.rootUrl + '/create', this.state)
            .then((response) => {
                if (response.data.success) {
                    this.props.addProcedure(response.data.procedure);
                } else {
                    console.log(response.data.err);
                }
            })
            .catch((error) => {
                console.log("Unexpected error: " + error);
            });
    }
    render() {
        return (
            <div className="AddStoredProcedure flex items-center justify-center shadow-lg absolute pin bg-opaque z-30">
                <div className="absolute pin rounded bg-white flex flex-col p-4 m-4 md:m-12 lg:m-24">
                    <div className="flex items-center pb-4">
                        <h4>Create a Stored Procedure</h4>
                        <FontAwesomeIcon onClick={() => this.props.exitAddingProcedure()} className="cursor-pointer ml-auto fa-2x" icon={"times"} />
                    </div>
                    <div className="flex flex-col flex-1 overflow-y-auto">
                        <input placeholder={"Procedure Name"} value={this.state.name} onChange={(evt) => this.setState({name: evt.target.value})} type={"text"} className={"px-4 py-2 text-teal my-2 rounded border-2 border-teal focus:outline-none"}/>
                        <div className={"flex px-4 py-2 text-teal my-2 rounded border-2 border-teal items-center focus:outline-none"}>
                            <FontAwesomeIcon className="h-4" icon={"dollar-sign"}/>
                            <input placeholder={"Default Cost"} value={this.state.default_cost} onChange={(evt) => this.setState({default_cost: evt.target.value})} type={"number"} step={1} className={"flex-1 pl-1 text-teal rounded-r focus:outline-none"}/>
                        </div>
                        <input placeholder={"Description"} value={this.state.description} onChange={(evt) => this.setState({description: evt.target.value})} type={"text"} className={"px-4 py-2 text-teal my-2 rounded border-2 border-teal focus:outline-none"}/>
                    </div>
                    <button onClick={() => this.addProcedure()} className="flex p-4 rounded border-2 border-teal justify-center text-teal hover:text-white hover:bg-teal focus:outline-none">Save</button>
                </div>
            </div>
        );
    }
}
export default AddStoredProcedure;
