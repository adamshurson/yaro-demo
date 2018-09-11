import React, { Component } from 'react';
import axios from "axios";
import VisitMap from "../visitmap/index";
import GoogleMapReact from 'google-map-react';
import Spending from "../spending";
import VisitPearl from '../../pearls/visit';

class Home extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            visits: []
        };
        this.VisitPearl = new VisitPearl();
        // check if production or not
        if (window.location.href === 'http://localhost:3000/') {
            this.rootUrl = 'http://localhost:5000';
        } else {
            this.rootUrl = 'http://167.99.107.141/api';
        }
    }
    componentDidMount() {
        axios.get(this.rootUrl + '/visits/get')
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
    calculateCost(visit) {
        return visit.procedures.reduce((sum, procedure) => sum + procedure.cost, 0);
    }
    toVisit(visit) {
        this.VisitPearl.setState({
            visit: visit
        });
        this.props.setPage('detail');
    }
    render() {
        const Title = ({ text }) => <div className="text-white p-4 min-w-fit whitespace-no-wrap bg-opaque-dark rounded-full">{text}</div>;
        return (
            <div className="Home flex flex-col">
                <div className="flex flex-wrap">
                    <div className="p-4 w-full lg:w-1/2">
                        <div className="shadow-md hover:shadow-lg rounded overflow-hidden">
                            <Spending visits={this.state.visits}/>
                        </div>
                    </div>
                    <div className="p-4 w-full lg:w-1/2">
                        <div className="shadow-md hover:shadow-lg rounded overflow-hidden relative h-64 lg:h-full">
                            <VisitMap visits={this.state.visits}/>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap">
                    {
                        this.state.visits.map((visit) => {
                            return <div key={visit._id} className={"flex w-full lg:w-1/2 xl:w-1/3 p-4"}>
                                <div className={"flex w-full bg-white items-center shadow-md hover:shadow-lg text-teal"}>
                                    <div onClick={() => this.toVisit(visit)} className={"flex flex-1 px-4 flex-col cursor-pointer"}>
                                        <div className={"pb-2 flex"}>
                                            <h5 className={"font-normal"}>{(new Date(visit.date)).toLocaleDateString()}</h5>
                                            <h5 className={"font-normal ml-auto"}>${this.calculateCost(visit)}</h5>
                                        </div>
                                        <h5 className={"py-2 font-normal"}>{visit.doctor.profile.first_name + " " + visit.doctor.profile.last_name}</h5>
                                        <h5 className={"py-2 font-normal"}>Blue Cross Blue Shield</h5>
                                    </div>
                                    <div className={"w-1/2 h-32 rounded-r overflow-hidden relative"}>
                                        <GoogleMapReact
                                            bootstrapURLKeys={{ key: "AIzaSyBYYFXhpIKcxaiDqLDGhJNxs9T9g5Bk4t4" }}
                                            defaultCenter={
                                                {
                                                    lat: visit.location.lat,
                                                    lng: visit.location.lon
                                                }
                                            }
                                            defaultZoom={13}
                                        >
                                            <Title
                                                lat={visit.location.lat}
                                                lng={visit.location.lon}
                                                text={visit.location.street}
                                            />
                                        </GoogleMapReact>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        );
    }
}
export default Home;
