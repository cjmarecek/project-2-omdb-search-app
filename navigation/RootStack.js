import { createStackNavigator } from 'react-navigation-stack';

import MovieDetailScreen from '../screens/MovieDetailScreen';
import MovieListScreen from '../screens/MovieListScreen';

export default RootStack = createStackNavigator(
  {
    Home: {
      screen: MovieListScreen,
      navigationOptions: () => ({
        headerShown: false,
      })
    },
    Detail: {
      screen: MovieDetailScreen,
      navigationOptions: ({ navigation }) => ({
        title: navigation.getParam('title'),
        headerTitleStyle: {
          fontWeight: 'bold',
          left: 15, // THIS RIGHT HERE
        },
        headerLayoutPreset: 'center',
        headerBackTitleVisible: false,
        headerLeftContainerStyle: {
          left: 5,
          color: "black",
        },
        headerTintColor: 'black',
      }),
    },
  },
  {
    initialRouteName: 'Home',
  },
);
