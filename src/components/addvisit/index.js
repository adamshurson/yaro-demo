import React, { Component } from 'react';
import axios from 'axios';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class AddStoredProcedure extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            procedures: [],
            stored_procedures: [],
            currentProcedureIndex: 0,
            doctor: 0,
            date: (new Date()).toISOString().split('T')[0],
            location: {},
            doctors: []
        };
        // check if production or not
        if (window.location.href === 'http://localhost:3000/') {
            this.rootUrl = 'http://localhost:5000';
        } else {
            this.rootUrl = 'http://167.99.107.141/api';
        }
    }
    componentDidMount() {
        axios.get(this.rootUrl + '/doctors/get')
            .then((response) => {
                if (response.data.success) {
                    this.setState({
                        doctors: response.data.doctors
                    });
                } else {
                    console.log(response.data.err);
                }
            })
            .catch((error) => {
                console.log("Unexpected error: " + error);
            });
        axios.get(this.rootUrl + '/stored_procedures/get')
            .then((response) => {
                if (response.data.success) {
                    this.setState({
                        stored_procedures: response.data.procedures
                    });
                } else {
                    console.log(response.data.err);
                }
            })
            .catch((error) => {
                console.log("Unexpected error: " + error);
            });
    }
    addVisit() {
        const visit = {
            procedures: this.state.procedures,
            doctor: this.state.doctor,
            date: this.state.date,
            location: this.state.location,
            user: this.props.user
        };
        axios.post(this.rootUrl + '/visits/create', visit)
            .then((response) => {
                if (response.data.success) {
                    this.props.addVisit(response.data.visit);
                } else {
                    console.log(response.data.err);
                }
            })
            .catch((error) => {
                console.log("Unexpected error: " + error);
            });
    }
    getDoctor() {
        if (this.state.doctor === 0) {
            return { practices: [] };
        } else {
            return this.state.doctors.filter((doc) => doc._id === this.state.doctor)[0];
        }
    }
    setLocation(uid) {
        if (this.state.doctor !== 0) {
            const doc = this.getDoctor();
            const location = doc.practices.filter((practice) => practice.uid === uid)[0];
            const adjusted = Object.assign({}, location.visit_address);
            adjusted.uid = location.uid;
            this.setState({
                location: adjusted
            });
        }
    }
    addProcedure() {
        const procedures = this.state.procedures;
        const template = this.state.stored_procedures[this.state.currentProcedureIndex];
        procedures.push({
            name: template.name,
            description: template.description,
            cost: template.default_cost
        });
        this.setState({
            procedures: procedures
        });
    }
    setCost(index, cost) {
        const procedures = this.state.procedures;
        procedures[index].cost = cost;
        this.setState({
            procedures: procedures
        });
    }
    render() {
        return (
            <div className="AddVisit flex items-center justify-center shadow-lg absolute pin bg-opaque z-30">
                <div className="absolute pin rounded bg-white flex flex-col p-4 m-4 md:m-12 lg:m-24">
                    <div className="flex items-center pb-4">
                        <h4>Create a Visit</h4>
                        <FontAwesomeIcon onClick={() => this.props.exitAddingVisit()} className="cursor-pointer ml-auto fa-2x" icon={"times"} />
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        <div className="flex flex-col h-fit">
                            <select value={this.state.doctor} onChange={(evt) => this.setState({doctor: evt.target.value})} className={"px-4 py-2 text-teal my-2 rounded border-2 border-teal focus:outline-none"}>
                                <option value={0}>Select a Doctor</option>
                                {
                                    this.state.doctors.map((doc) => {
                                        return <option key={doc._id} value={doc._id}>{doc.profile.first_name + " " + doc.profile.last_name}</option>
                                    })
                                }
                            </select>
                            <select value={this.state.location.uid} onChange={(evt) => this.setLocation(evt.target.value)} className={"px-4 py-2 text-teal my-2 rounded border-2 border-teal focus:outline-none"}>
                                <option value={0}>Select a Location</option>
                                {
                                    this.getDoctor().practices.map((practice) => {
                                        return <option key={practice.uid} value={practice.uid}>{practice.visit_address.street + " " + practice.visit_address.state + ", " + practice.visit_address.zip}</option>
                                    })
                                }
                            </select>
                            <input value={this.state.date} onChange={(evt) => this.setState({date: evt.target.value})} type={"date"} className={"px-4 py-2 text-teal my-2 rounded border-2 border-teal focus:outline-none"}/>
                            {
                                this.state.procedures.map((proc, index) => {
                                    return <div key={index} className="flex">
                                        <p className={"flex-1 px-4 py-2 text-teal my-2 rounded border-2 border-teal focus:outline-none"}>{proc.name} cost:</p>
                                        <input value={proc.cost} onChange={(evt) => this.setCost(index, evt.target.value)} type={"number"} step={1} className={"ml-8 px-4 py-2 text-teal my-2 rounded border-2 border-teal focus:outline-none"}/>
                                    </div>
                                })
                            }
                            <div className="flex">
                                <select value={this.state.currentProcedureIndex} onChange={(evt) => this.setState({currentProcedureIndex: evt.target.value})} className={"flex-1 px-4 py-2 text-teal my-2 rounded border-2 border-teal focus:outline-none"}>
                                    {
                                        this.state.stored_procedures.map((procedure, index) => {
                                            return <option key={procedure._id} value={index}>{procedure.name}</option>
                                        })
                                    }
                                </select>
                                <button onClick={() => this.addProcedure()} className={"ml-8 px-4 py-2 text-teal my-2 rounded border-2 border-teal focus:outline-none"}>Add Procedure</button>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => this.addVisit()} className="flex p-4 rounded border-2 border-teal justify-center text-teal hover:text-white hover:bg-teal focus:outline-none">Save</button>
                </div>
            </div>
        );
    }
}
export default AddStoredProcedure;
