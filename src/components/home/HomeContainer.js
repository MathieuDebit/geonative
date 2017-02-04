import React, { Component } from 'react';
import GeolocationDisplay from './GeolocationDisplay';

class HomeContainer extends Component {
  state = {
    initialPosition: {},
    lastPosition: {},
  };

  watchID: ?number = null;

  componentDidMount() {
    const geo_success = (position) => {
      var initialPosition = position;
      this.setState({initialPosition});
    };

    const geo_error = (error) => alert(JSON.stringify(error));

    const geo_options = {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 1000,
      distanceFilter: 1
    }

    navigator.geolocation.getCurrentPosition(geo_success, geo_error, geo_options);

    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = position;
      this.setState({lastPosition});
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    return (
      <GeolocationDisplay
        initialPosition = {this.state.initialPosition}
        lastPosition = {this.state.lastPosition}
      />
    );
  }
}

export default HomeContainer;
