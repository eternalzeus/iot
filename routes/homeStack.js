import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from '../screens/home';
import Map from '../screens/Map';

const screens = {
  Home: {
    screen: Home,
  },
  Map: {
    screen: Map,
  },
};

// home stack navigator screens
const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);

