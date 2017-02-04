import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import HomeContainer from './src/components/home/HomeContainer';

export default class geonative extends Component {

  render() {
    return <HomeContainer />
  }
}

AppRegistry.registerComponent('geonative', () => geonative);
