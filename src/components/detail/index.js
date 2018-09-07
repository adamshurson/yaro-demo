import React, { Component } from 'react';
import GoogleMapReact from "google-map-react";

class Detail extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.zoom = 11;
        this.center = {
            lat: 59.95,
            lng: 30.33
        };
        this.procedures = [
            {
                title: 'Blood Test',
                description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
                cost: 400.00
            },
            {
                title: 'Immunization',
                description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
                cost: 100.00
            }
        ];
        this.state = {
            currentProcedure: 0
        };
    }
    setProcedure(index) {
        this.setState({
            currentProcedure: index
        });
    }
    renderProcedureItems() {
        return this.procedures.map((item, index) => {
           return <button onClick={() => this.setProcedure(index)} key={index} className={(index === this.state.currentProcedure ? "bg-teal text-white" : "text-teal")
                + " py-1 px-2 rounded border border-teal mr-2 hover:text-white hover:bg-teal focus:outline-none"}>{item.title}</button>
        });
    }
    render() {
        const AnyReactComponent = ({ text }) => <div>{text}</div>;
        const procedureItems = this.renderProcedureItems();
        return (
            <div className="Detail flex flex-col text-teal">
                <div className={"flex flex-wrap"}>
                    <div className={"flex flex-col w-full lg:w-1/2 lg:pr-4 mb-4 lg:mb-0"}>
                        <div className={"px-4 py-2 bg-white rounded shadow-md hover:shadow-lg mb-4"}>
                            <h4 className={"py-2"}>Dr. Jarrod Sheatsley</h4>
                            <h4 className={"font-normal py-2"}>Everdeen Medical Center</h4>
                            <h4 className={"font-normal py-2"}>500 N Michigan Avenue Suite 300</h4>
                        </div>
                        <div className={"px-4 py-2 bg-white rounded shadow-md hover:shadow-lg"}>
                            <h4 className={"py-2"}>Blue Cross Blue Shield</h4>
                            <h4 className={"font-normal py-2"}>PPO PlanID1234</h4>
                            <h4 className={"font-normal py-2"}>Total Cost: $500</h4>
                        </div>
                    </div>
                    <div className={"flex w-full lg:w-1/2 h-64"}>
                        <div className={"shadow-md w-full hover:shadow-lg rounded overflow-hidden"}>
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
                <button className={"px-4 py-2 bg-teal rounded shadow-md hover:shadow-lg mt-4 focus:outline-none text-white"}>Send Dr. Sheatsley a Message</button>
                <div className={"bg-white flex flex-col shadow-md hover:shadow-lg px-4 py-2 mt-4 rounded overflow-hidden"}>
                    { this.procedures.length > 1
                        ? <div>
                            <h3 className={"py-2"}>Procedures</h3>
                            <div className={"flex my-2"}>
                                {procedureItems}
                            </div>
                        </div>
                        : ""
                    }
                    <div className={"flex flex-col"}>
                        <div className={"flex py-2"}>
                            <h4>{this.procedures[this.state.currentProcedure].title}</h4>
                            <p className={"ml-auto"}>${this.procedures[this.state.currentProcedure].cost}</p>
                        </div>
                        <p className={"py-2"}>{this.procedures[this.state.currentProcedure].description}</p>
                    </div>
                </div>
            </div>
        );
    }
}
export default Detail;
