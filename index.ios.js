import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class geonative extends Component {
  state = {
    initialPosition: 'unknown',
    lastPosition: 'unknown',
  };

  watchID: ?number = null;

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = position;
        this.setState({initialPosition});
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 1}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = position;
      this.setState({lastPosition});
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  dateFormat(timestamp) {
    return new Date(timestamp).toUTCString();
  }

  render() {
    let initialPosition = this.state.initialPosition;
    let lastPosition = this.state.lastPosition;

    return (
      <View style={styles.container}>
        <Text>
          { initialPosition.coords &&
            <Text>
              <Text style={styles.title}>Initial position: {"\n"}</Text>
              <Text>speed: {initialPosition.coords.speed}{"\n"}</Text>
              <Text>longitude: {initialPosition.coords.longitude}{"\n"}</Text>
              <Text>latitude: {initialPosition.coords.latitude}{"\n"}</Text>
              <Text>accuacy: {initialPosition.coords.accuracy}{"\n"}</Text>
              <Text>heading: {initialPosition.coords.heading}{"\n"}</Text>
              <Text>altitude: {initialPosition.coords.altitude}{"\n"}</Text>
              <Text>altitudeAccuracy: {initialPosition.coords.altitudeAccuracy}{"\n"}</Text>
              <Text>timestamp: {this.dateFormat(initialPosition.timestamp)}{"\n"}</Text>
            </Text>
          }
        </Text>
        <Text>
          { lastPosition.coords &&
            <Text>
              <Text style={styles.title}>Current position: {"\n"}</Text>
              <Text>speed: {lastPosition.coords.speed}{"\n"}</Text>
              <Text>longitude: {lastPosition.coords.longitude}{"\n"}</Text>
              <Text>latitude: {lastPosition.coords.latitude}{"\n"}</Text>
              <Text>accuacy: {lastPosition.coords.accuracy}{"\n"}</Text>
              <Text>heading: {lastPosition.coords.heading}{"\n"}</Text>
              <Text>altitude: {lastPosition.coords.altitude}{"\n"}</Text>
              <Text>altitudeAccuracy: {lastPosition.coords.altitudeAccuracy}{"\n"}</Text>
              <Text>timestamp: {this.dateFormat(lastPosition.timestamp)}{"\n"}</Text>
            </Text>
          }
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontWeight: '500',
  },
});

AppRegistry.registerComponent('geonative', () => geonative);
