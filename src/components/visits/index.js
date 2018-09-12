import React, { Component } from 'react';
import axios from 'axios';
import AddVisit from "../addvisit";
import ScrollPearl from '../../pearls/scroll';
import AccountPearl from "../../pearls/account";

class Visit extends Component {
    constructor() {
        super();
        this.state = {
            visits: [],
            isAddingVisit: false,
            isEditingVisit: false,
            visit: null
        };
        // check if production or not
        if (window.location.href === 'http://localhost:3000/') {
            this.rootUrl = 'http://localhost:5000/visits';
        } else {
            this.rootUrl = 'http://167.99.107.141/api/visits';
        }
    }
    componentDidMount() {
        this.ScrollPearl = new ScrollPearl();
        this.AccountPearl = new AccountPearl();
        this.AccountPearl.subscribe((newState) => {
            this.setState({
                token: newState.token,
                userObject: newState.userObject
            }, this.fetchVisits);
        });
    }
    fetchVisits() {
        axios.post(this.rootUrl + '/get', {token: this.state.token})
            .then((response) => {
                if (response.data.success) {
                    this.setState({
                        visits: response.data.visits
                    });
                } else {
                    console.log(response.data.err);
                }
            })
            .catch((error) => {
                console.log("Unexpected error: " + error);
            });
    }
    addVisit(visit) {
        const visits = this.state.visits;
        visits.push(visit);
        this.setState({
            visits: visits,
            isAddingVisit: false
        });
    }
    editVisit(visit) {
        const visits = this.state.visits;
        visits.map((vis, index) => {
           if (vis._id === visit._id) {
               visits[index] = visit;
           }
        });
        this.setState({
            visits: visits,
            visit: null,
            isEditingVisit: false
        });
    }
    deleteVisit(visit) {
        axios.post(this.rootUrl + '/delete', {visit_id: visit._id})
            .then((response) => {
                if (response.data.success) {
                    let visits = this.state.visits;
                    visits = visits.filter((vis) => vis._id !== visit._id);
                    this.setState({
                        visits: visits
                    });
                } else {
                    console.log(response.data.err);
                }
            })
            .catch((error) => {
                console.log("Unexpected error: " + error);
            });
    }
    exitAddingVisit() {
        this.setState({
            isAddingVisit: false
        });
        this.ScrollPearl.setState({
            isAllowed: true
        });
    }
    exitEditingVisit() {
        this.setState({
            isEditingVisit: false,
            visit: null
        });
        this.ScrollPearl.setState({
            isAllowed: true
        });
    }
    calculateCost(visit) {
        return visit.procedures.reduce((sum, procedure) => sum + procedure.cost, 0);
    }
    render() {
        return (
            <div className="Visits flex flex-col">
                <div className="p-4">
                    <div onClick={() => {this.setState({isAddingVisit: true}); this.ScrollPearl.setState({isAllowed: true});}} className={"bg-white text-teal cursor-pointer shadow-md hover:shadow-lg rounded p-4 flex items-center justify-center"}>
                        Add Visit
                    </div>
                </div>
                <div className="flex flex-wrap">
                {
                    this.state.visits.map((visit) => {
                        return <div key={visit._id} className={"w-full md:w-1/2 lg:w-1/3 p-4"}>
                            <div className="Visit bg-white w-full shadow-md hover:shadow-lg rounded p-4 relative">
                                <div className={"flex pb-4"}>
                                    <h4 className={"text-teal"}>{visit.doctor.profile.first_name + " " + visit.doctor.profile.last_name}</h4>
                                    <h4 className={"text-teal ml-auto font-normal"}>{(new Date(visit.date)).toLocaleDateString()}</h4>
                                </div>
                                <div className="flex">
                                    <h4 className={"text-teal font-normal"}>Procedures: {visit.procedures.length}</h4>
                                    <h4 className={"text-teal font-normal ml-auto"}>${this.calculateCost(visit)}</h4>
                                </div>
                                <div className="VisitOverlay absolute pin bg-opaque-dark rounded flex items-center justify-center">
                                    <button onClick={() => {console.log(visit); this.setState({isEditingVisit: true, visit: visit})}} className="flex p-4 rounded border-2 border-teal justify-center text-teal hover:text-white hover:bg-teal focus:outline-none">Edit</button>
                                    <button onClick={() => this.deleteVisit(visit)} className="ml-8 flex p-4 rounded border-2 border-red justify-center text-red hover:text-white hover:bg-red focus:outline-none">Delete</button>
                                </div>
                            </div>
                        </div>
                    })
                }
                </div>
                { this.state.isAddingVisit
                    ? <AddVisit user={this.state.userObject._id} addVisit={(visit) => this.addVisit(visit)} exitAddingVisit={() => this.exitAddingVisit()}/>
                    : null
                }
            </div>
        );
    }
}
export default Visit;
