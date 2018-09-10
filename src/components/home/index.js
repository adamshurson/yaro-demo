import React, { Component } from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import GoogleMapReact from 'google-map-react';
import axios from "axios";

class Home extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.zoom = 11;
        this.center = {
            lat: 59.95,
            lng: 30.33
        };
        this.state = {
            visits: []
        };
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
    }z
    render() {
        const options = {
            title: {
                text: 'My Spending'
            },
            series: [{
                data: [1, 2, 3]
            }]
        };
        const AnyReactComponent = ({ text }) => <div>{text}</div>;
        return (
            <div className="Home">
                <div className={"shadow-md hover:shadow-lg rounded overflow-hidden"}>
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={options}
                    />
                </div>
                <div className="flex flex-wrap mt-2">
                    {
                        this.state.visits.map((visit) => {
                            return <div key={visit._id} className={"flex w-full lg:w-1/2 xl:w-1/3 p-4"}>
                                <div onClick={() => this.props.setPage('detail')} className={"flex w-full bg-white items-center shadow-md hover:shadow-lg cursor-pointer rounded text-teal"}>
                                    <div className={"flex flex-1 px-4 flex-col"}>
                                        <div className={"pb-2 flex"}>
                                            <h5 className={"font-normal"}>{(new Date(visit.date)).toLocaleDateString()}</h5>
                                            <h5 className={"font-normal ml-auto"}>${this.calculateCost(visit)}</h5>
                                        </div>
                                        <h5 className={"py-2 font-normal"}>{visit.doctor.profile.first_name + " " + visit.doctor.profile.last_name}</h5>
                                        <h5 className={"py-2 font-normal"}>Blue Cross Blue Shield</h5>
                                    </div>
                                    <div className={"w-1/2 h-32 rounded-r"}>
                                        <GoogleMapReact
                                            bootstrapURLKeys={{ key: "AIzaSyBYYFXhpIKcxaiDqLDGhJNxs9T9g5Bk4t4" }}
                                            defaultCenter={
                                                {
                                                    lat: visit.location.lat,
                                                    lng: visit.location.lon
                                                }
                                            }
                                            defaultZoom={11}
                                        >
                                            <AnyReactComponent
                                                lat={visit.location.lat}
                                                lng={visit.location.lon}
                                                text={'Office'}
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
