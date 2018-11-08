/* eslint-disable no-undef */
/* global google */

import React, { Component } from 'react';
const { withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer, Marker } = require("react-google-maps");

class Direction extends Component {
  constructor(){
    super()
    this.state = {
      directions : null
    }

    this.getDirections = this.getDirections.bind(this);
  }


  getDirections(myLocation, placeLocation) {
    const DirectionsService = new google.maps.DirectionsService();
   
      DirectionsService.route({
        origin: new google.maps.LatLng(myLocation.latitude, myLocation.longitude),
        destination: new google.maps.LatLng(placeLocation.latitude, placeLocation.longitude),
        travelMode: google.maps.TravelMode.DRIVING,
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          });
        } else {
          console.log(result)
          alert("Sorry! Can't calculate directions!")
        }
      });
  }


  render() {
    return <div>
      <MyMapComponent
        isMarkerShown={true}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAdEpcl4TZffTuX0F7keZmYtaBFia1w_pQ"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        mylocation={this.props.mylocation}
        placeLocation={this.props.placeLocation}
        directions={this.state.directions}

      />
      <button onClick={(myLocation, placeLocation) => this.getDirections(this.props.mylocation , this.props.placeLocation)} >get Directions</button>
    </div>
  }
}


const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={14}
    defaultCenter={new google.maps.LatLng(props.mylocation.latitude, props.mylocation.longitude)}
  >
    <Marker
      position={{ lat: props.mylocation.latitude, lng: props.mylocation.longitude }}
    />
    <Marker
      position={{ lat: props.placeLocation.latitude, lng: props.placeLocation.longitude }}
    />
  {props.directions && <DirectionsRenderer directions={props.directions} />}

  </GoogleMap>
))



export default Direction;