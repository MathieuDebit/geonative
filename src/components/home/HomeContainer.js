import React, { Component } from 'react';
import { View } from 'react-native';
import GeolocationDisplay from './GeolocationDisplay';
import SvgMap from './SvgMap';

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
    const initialCoords = this.state.initialPosition.coords;
    let longitude = 0;
    let latitude = 0;

    if (initialCoords) {
      longitude = - (initialCoords.longitude.toString().split(".")[1] - 24636) / 17.681;
      latitude = (initialCoords.latitude.toString().split(".")[1] - 91166) / 10.458;
    }

    return (
      <View>
        { initialCoords &&
          <SvgMap params={{
              top: 0,
              left: 0,
              scale: 1,
            }}
          />
        }
      </View>
    );
  }
}

export default HomeContainer;
