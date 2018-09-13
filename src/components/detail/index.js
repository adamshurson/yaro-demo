import React, { Component } from 'react';
import GoogleMapReact from "google-map-react";
import VisitPearl from '../../pearls/visit';

// details of a visit
class Detail extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            currentProcedure: 0,
            // need to set the visit subattributes so we don't get reference errors
            visit: {
                procedures: [],
                doctor: {
                    profile: {}
                },
                location: {},
                date: null
            }
        };
    }
    componentDidMount() {
        // for now, we manage the state with a pearl
        // i'd like to convert to just using props since the visit is not
        // variable
        this.VisitPearl = new VisitPearl();
        this.VisitPearl.subscribe((newState) => {
            this.setState({
                visit: newState.visit
            });
        });
    }
    // set the current procedure
    setProcedure(index) {
        this.setState({
            currentProcedure: index
        });
    }
    // render all of the procedure buttons
    renderProcedureItems() {
        return this.state.visit.procedures.map((item, index) => {
           return <button onClick={() => this.setProcedure(index)} key={index} className={(index === this.state.currentProcedure ? "bg-teal text-white" : "text-teal")
                + " py-1 px-2 rounded border border-teal mr-2 hover:text-white hover:bg-teal focus:outline-none"}>{item.name}</button>
        });
    }
    // calculate the cost of our visit
    calculateCost(visit) {
        return visit.procedures.reduce((sum, procedure) => sum + procedure.cost, 0);
    }
    render() {
        const Title = ({ text }) => <div className="text-white p-4 min-w-fit whitespace-no-wrap bg-opaque-dark rounded-full">{text}</div>;
        const procedureItems = this.renderProcedureItems();
        return (
            <div className="Detail flex flex-col text-teal p-4">
                <div className={"flex flex-wrap"}>
                    <div className={"flex flex-col w-full lg:w-1/2 lg:pr-4 mb-4 lg:mb-0"}>
                        <div className={"px-4 py-2 bg-white rounded shadow-md hover:shadow-lg mb-4"}>
                            <h4 className={"py-2"}>{this.state.visit.doctor.profile.first_name + " " + this.state.visit.doctor.profile.last_name}</h4>
                            <h4 className={"font-normal py-2"}>{this.state.visit.location.street}</h4>
                            <h4 className={"font-normal py-2"}>{this.state.visit.location.city + ", " + this.state.visit.location.state
                                + " " + this.state.visit.location.zip}</h4>
                        </div>
                        <div className={"px-4 py-2 bg-white rounded shadow-md hover:shadow-lg"}>
                            <h4 className={"py-2"}>Blue Cross Blue Shield</h4>
                            <h4 className={"font-normal py-2"}>PPO PlanID1234</h4>
                            <h4 className={"font-normal py-2"}>{"Total Cost: $" + this.calculateCost(this.state.visit)}</h4>
                        </div>
                    </div>
                    <div className={"flex w-full lg:w-1/2 h-64"}>
                        <div className={"shadow-md w-full hover:shadow-lg rounded overflow-hidden"}>
                            <GoogleMapReact
                                bootstrapURLKeys={{ key: "AIzaSyBYYFXhpIKcxaiDqLDGhJNxs9T9g5Bk4t4" }}
                                defaultCenter={
                                    {
                                        lat: this.state.visit.location.lat,
                                        lng: this.state.visit.location.lon
                                    }
                                }
                                defaultZoom={13}
                            >
                                <Title
                                    lat={this.state.visit.location.lat}
                                    lng={this.state.visit.location.lon}
                                    text={this.state.visit.location.street}
                                />
                            </GoogleMapReact>
                        </div>
                    </div>
                </div>
                <button onClick={() => this.props.newMessage(this.state.visit.doctor._id)} className={"px-4 py-2 bg-teal rounded shadow-md hover:shadow-lg mt-4 focus:outline-none text-white"}>
                    {"Send Dr. " + this.state.visit.doctor.profile.last_name + " a Message"}
                </button>
                <div className={"bg-white flex flex-col shadow-md hover:shadow-lg px-4 py-2 mt-4 rounded overflow-hidden"}>
                    { this.state.visit.procedures.length > 1
                        ? <div>
                            <h3 className={"py-2"}>Procedures</h3>
                            <div className={"flex my-2"}>
                                {procedureItems}
                            </div>
                        </div>
                        : null
                    }
                    {
                        this.state.visit.procedures.length > 0
                        ? <div className={"flex flex-col"}>
                                <div className={"flex py-2"}>
                                    <h4>{this.state.visit.procedures[this.state.currentProcedure].name}</h4>
                                    <p className={"ml-auto"}>${this.state.visit.procedures[this.state.currentProcedure].cost}</p>
                                </div>
                                <p className={"py-2"}>{this.state.visit.procedures[this.state.currentProcedure].description}</p>
                            </div>
                        : null
                    }
                </div>
            </div>
        );
    }
}
export default Detail;
