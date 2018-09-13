import React, { Component } from 'react';
import axios from 'axios';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

// view for editing stored procedures
class EditingStoredProcedure extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            procedure_id: props.procedure._id,
            name: props.procedure.name,
            description: props.procedure.description,
            default_cost: props.procedure.default_cost
        };
        // check if production or not
        if (window.location.href === 'http://localhost:3000/') {
            this.rootUrl = 'http://localhost:5000/stored_procedures';
        } else {
            this.rootUrl = 'http://167.99.107.141/api/stored_procedures';
        }
    }
    // send a request to edit the procedure on our api
    editProcedure() {
        axios.post(this.rootUrl + '/edit', this.state)
            .then((response) => {
                if (response.data.success) {
                    this.props.editProcedure(response.data.procedure);
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
            <div className="EditStoredProcedure flex items-center justify-center shadow-lg absolute pin bg-opaque z-30">
                <div className="absolute pin rounded bg-white flex flex-col p-4 m-4 md:m-12 lg:m-24">
                    <div className="flex items-center pb-4">
                        <h4>Edit a Stored Procedure</h4>
                        <FontAwesomeIcon onClick={() => this.props.exitEditingProcedure()} className="cursor-pointer ml-auto fa-2x" icon={"times"} />
                    </div>
                    <div className="flex flex-col flex-1 overflow-y-auto">
                        <input placeholder={"Procedure Name"} value={this.state.name} onChange={(evt) => this.setState({name: evt.target.value})} type={"text"} className={"px-4 py-2 text-teal my-2 rounded border-2 border-teal focus:outline-none"}/>
                        <input placeholder={"Default Cost"} value={this.state.default_cost} onChange={(evt) => this.setState({default_cost: evt.target.value})} type={"number"} step={1} className={"px-4 py-2 text-teal my-2 rounded border-2 border-teal focus:outline-none"}/>
                        <input placeholder={"Description"} value={this.state.description} onChange={(evt) => this.setState({description: evt.target.value})} type={"text"} className={"px-4 py-2 text-teal my-2 rounded border-2 border-teal focus:outline-none"}/>
                    </div>
                    <button onClick={() => this.editProcedure()} className="flex p-4 rounded border-2 border-teal justify-center text-teal hover:text-white hover:bg-teal focus:outline-none">Save</button>
                </div>
            </div>
        );
    }
}
export default EditingStoredProcedure;
