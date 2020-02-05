import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import MovieDetailScreen from './screens/MovieDetailScreen';
import HomeScreen from './screens/HomeScreen';

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Detail: MovieDetailScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);
