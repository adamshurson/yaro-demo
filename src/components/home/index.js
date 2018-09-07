import React, { Component } from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import GoogleMapReact from 'google-map-react';

class Home extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.zoom = 11;
        this.center = {
            lat: 59.95,
            lng: 30.33
        };
    }
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
                    <div className={"flex w-full lg:w-1/2 xl:w-1/3 py-2 px-1"}>
                        <div onClick={() => this.props.setPage('detail')} className={"flex w-full bg-white items-center px-4 shadow-md hover:shadow-lg cursor-pointer rounded text-teal"}>
                            <div className={"flex flex-1 flex-col"}>
                                <div className={"pb-2 flex"}>
                                    <h5 className={"font-normal"}>9/15/2018</h5>
                                    <h5 className={"font-normal ml-auto"}>$500</h5>
                                </div>
                                <h5 className={"py-2 font-normal"}>Dr. Jarrod Sheatsley</h5>
                                <h5 className={"py-2 font-normal"}>Blue Cross Blue Shield</h5>
                            </div>
                            <div className={"ml-auto pl-4 py-4 w-1/2 h-32"}>
                                <GoogleMapReact
                                    bootstrapURLKeys={{ key: "AIzaSyBYYFXhpIKcxaiDqLDGhJNxs9T9g5Bk4t4" }}
                                    defaultCenter={this.center}
                                    defaultZoom={this.zoom}
                                >
                                    <AnyReactComponent
                                        lat={59.955413}
                                        lng={30.337844}
                                        text={'Kreyser Avrora'}
                                    />
                                </GoogleMapReact>
                            </div>
                        </div>
                    </div>
                    <div className={"flex w-full lg:w-1/2 xl:w-1/3 py-2 px-1"}>
                        <div onClick={() => this.props.setPage('detail')} className={"flex w-full bg-white items-center px-4 shadow-md hover:shadow-lg cursor-pointer rounded text-teal"}>
                            <div className={"flex flex-1 flex-col"}>
                                <div className={"pb-2 flex"}>
                                    <h5 className={"font-normal"}>9/15/2018</h5>
                                    <h5 className={"font-normal ml-auto"}>$500</h5>
                                </div>
                                <h5 className={"py-2 font-normal"}>Dr. Jarrod Sheatsley</h5>
                                <h5 className={"py-2 font-normal"}>Blue Cross Blue Shield</h5>
                            </div>
                            <div className={"ml-auto pl-4 py-4 w-1/2 h-32"}>
                                <GoogleMapReact
                                    bootstrapURLKeys={{ key: "AIzaSyBYYFXhpIKcxaiDqLDGhJNxs9T9g5Bk4t4" }}
                                    defaultCenter={this.center}
                                    defaultZoom={this.zoom}
                                >
                                    <AnyReactComponent
                                        lat={59.955413}
                                        lng={30.337844}
                                        text={'Kreyser Avrora'}
                                    />
                                </GoogleMapReact>
                            </div>
                        </div>
                    </div>
                    <div className={"flex w-full lg:w-1/2 xl:w-1/3 py-2 px-1"}>
                        <div onClick={() => this.props.setPage('detail')} className={"flex w-full bg-white items-center px-4 shadow-md hover:shadow-lg cursor-pointer rounded text-teal"}>
                            <div className={"flex flex-1 flex-col"}>
                                <div className={"pb-2 flex"}>
                                    <h5 className={"font-normal"}>9/15/2018</h5>
                                    <h5 className={"font-normal ml-auto"}>$500</h5>
                                </div>
                                <h5 className={"py-2 font-normal"}>Dr. Jarrod Sheatsley</h5>
                                <h5 className={"py-2 font-normal"}>Blue Cross Blue Shield</h5>
                            </div>
                            <div className={"ml-auto pl-4 py-4 w-1/2 h-32"}>
                                <GoogleMapReact
                                    bootstrapURLKeys={{ key: "AIzaSyBYYFXhpIKcxaiDqLDGhJNxs9T9g5Bk4t4" }}
                                    defaultCenter={this.center}
                                    defaultZoom={this.zoom}
                                >
                                    <AnyReactComponent
                                        lat={59.955413}
                                        lng={30.337844}
                                        text={'Kreyser Avrora'}
                                    />
                                </GoogleMapReact>
                            </div>
                        </div>
                    </div>
                    <div className={"flex w-full lg:w-1/2 xl:w-1/3 py-2 px-1"}>
                        <div onClick={() => this.props.setPage('detail')} className={"flex w-full bg-white items-center px-4 shadow-md hover:shadow-lg cursor-pointer rounded text-teal"}>
                            <div className={"flex flex-1 flex-col"}>
                                <div className={"pb-2 flex"}>
                                    <h5 className={"font-normal"}>9/15/2018</h5>
                                    <h5 className={"font-normal ml-auto"}>$500</h5>
                                </div>
                                <h5 className={"py-2 font-normal"}>Dr. Jarrod Sheatsley</h5>
                                <h5 className={"py-2 font-normal"}>Blue Cross Blue Shield</h5>
                            </div>
                            <div className={"ml-auto pl-4 py-4 w-1/2 h-32"}>
                                <GoogleMapReact
                                    bootstrapURLKeys={{ key: "AIzaSyBYYFXhpIKcxaiDqLDGhJNxs9T9g5Bk4t4" }}
                                    defaultCenter={this.center}
                                    defaultZoom={this.zoom}
                                >
                                    <AnyReactComponent
                                        lat={59.955413}
                                        lng={30.337844}
                                        text={'Kreyser Avrora'}
                                    />
                                </GoogleMapReact>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Home;
