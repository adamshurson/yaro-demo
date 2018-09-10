import React, { Component } from 'react';
import axios from 'axios';
import AddStoredProcedure from "../addstoredprocedure";

class StoredProcedures extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            currentProcedure: null,
            procedures: [],
            isAddingProcedure: false
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
        console.log(procedures);
        this.setState({
            procedures: procedures,
            isAddingProcedure: false
        });
    }
    exitAddingProcedure() {
        this.setState({
            isAddingProcedure: false
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
                            <div className="bg-white w-full shadow-md hover:shadow-lg rounded p-4">
                                <div className={"flex pb-4"}>
                                    <h4 className={"text-teal"}>{procedure.name}</h4>
                                    <h4 className={"text-teal ml-auto font-normal"}>${procedure.default_cost}</h4>
                                </div>
                                <h4 className={"text-teal font-normal"}>{procedure.description}</h4>
                            </div>
                        </div>
                    })
                }
                { this.state.isAddingProcedure
                    ? <AddStoredProcedure addProcedure={(procedure) => this.addProcedure(procedure)} exitAddingProcedure={() => this.exitAddingProcedure()}/>
                    : null
                }
            </div>
        );
    }
}
export default StoredProcedures;
