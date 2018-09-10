import React, { Component } from 'react';
import axios from 'axios';
import AddStoredProcedure from "../addstoredprocedure";
import EditingStoredProcedure from "../editingstoredprocedure";

class StoredProcedures extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            currentProcedure: null,
            procedures: [],
            isAddingProcedure: false,
            isEditingProcedure: false,
            procedure: null
        };
        // check if production or not
        if (window.location.href === 'http://localhost:3000/') {
            this.rootUrl = 'http://localhost:5000/stored_procedures';
        } else {
            this.rootUrl = 'http://167.99.107.141/api/stored_procedures';
        }
    }
    componentDidMount() {
        axios.get(this.rootUrl + '/get')
            .then((response) => {
                if (response.data.success) {
                    this.setState({
                        procedures: response.data.procedures
                    });
                } else {
                    console.log(response.data.err);
                }
            })
            .catch((error) => {
                console.log("Unexpected error: " + error);
            });
    }
    addProcedure(procedure) {
        const procedures = this.state.procedures;
        procedures.push(procedure);
        this.setState({
            procedures: procedures,
            isAddingProcedure: false
        });
    }
    editProcedure(procedure) {
        const procedures = this.state.procedures;
        procedures.map((proc, index) => {
           if (proc._id === procedure._id) {
               procedures[index] = procedure;
           }
        });
        this.setState({
            procedures: procedures,
            procedure: null,
            isEditingProcedure: false
        });
    }
    deleteProcedure(procedure) {
        axios.post(this.rootUrl + '/delete', {procedure_id: procedure._id})
            .then((response) => {
                if (response.data.success) {
                    let procedures = this.state.procedures;
                    procedures = procedures.filter((proc) => proc._id !== procedure._id);
                    this.setState({
                        procedures: procedures
                    });
                } else {
                    console.log(response.data.err);
                }
            })
            .catch((error) => {
                console.log("Unexpected error: " + error);
            });
    }
    exitAddingProcedure() {
        this.setState({
            isAddingProcedure: false
        });
    }
    exitEditingProcedure() {
        this.setState({
            isEditingProcedure: false,
            procedure: null
        });
    }
    render() {
        return (
            <div className="StoredProcedures flex flex-wrap">
                <div onClick={() => this.setState({isAddingProcedure: true})} className={"bg-white text-teal w-full mb-4 cursor-pointer shadow-md hover:shadow-lg rounded p-4 flex items-center justify-center"}>
                    Add Procedure
                </div>
                {
                    this.state.procedures.map((procedure) => {
                        return <div key={procedure._id} className={"w-full md:w-1/2 lg:w-1/3 p-4"}>
                            <div className="Procedure bg-white w-full shadow-md hover:shadow-lg rounded p-4 relative">
                                <div className={"flex pb-4"}>
                                    <h4 className={"text-teal"}>{procedure.name}</h4>
                                    <h4 className={"text-teal ml-auto font-normal"}>${procedure.default_cost}</h4>
                                </div>
                                <h4 className={"text-teal font-normal"}>{procedure.description}</h4>
                                <div className="ProcedureOverlay absolute pin bg-opaque-dark rounded flex items-center justify-center">
                                    <button onClick={() => {console.log(procedure); this.setState({isEditingProcedure: true, procedure: procedure})}} className="flex p-4 rounded border-2 border-teal justify-center text-teal hover:text-white hover:bg-teal focus:outline-none">Edit</button>
                                    <button onClick={() => this.deleteProcedure(procedure)} className="ml-8 flex p-4 rounded border-2 border-red justify-center text-red hover:text-white hover:bg-red focus:outline-none">Delete</button>
                                </div>
                            </div>
                        </div>
                    })
                }
                { this.state.isAddingProcedure
                    ? <AddStoredProcedure addProcedure={(procedure) => this.addProcedure(procedure)} exitAddingProcedure={() => this.exitAddingProcedure()}/>
                    : null
                }
                { this.state.isEditingProcedure
                    ? <EditingStoredProcedure procedure={this.state.procedure}
                          editProcedure={(procedure) => this.editProcedure(procedure)}
                          exitEditingProcedure={() => this.exitEditingProcedure()}/>
                    : null
                }
            </div>
        );
    }
}
export default StoredProcedures;
