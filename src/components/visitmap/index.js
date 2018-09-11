import React from "react";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class VisitMap extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        const uniqueVisits = Array.from(new Set(this.props.visits));
        const bounds = new this.props.google.maps.LatLngBounds();
        const markers = uniqueVisits.map((uniqueVisit) => {
            bounds.extend({
                lat: uniqueVisit.location.lat,
                lng: uniqueVisit.location.lon
            });
            return <Marker key={uniqueVisit._id}
                           title={'Title'}
                           name={'Name'}
                           position={{lat: uniqueVisit.location.lat, lng: uniqueVisit.location.lon}}/>
        });
        return (
            <Map google={this.props.google} zoom={14}
                 initialCenter={{
                     lat: 42.39,
                     lng: -72.52
                 }}
                 bounds={bounds}>
                {markers}
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyBYYFXhpIKcxaiDqLDGhJNxs9T9g5Bk4t4")
})(VisitMap)