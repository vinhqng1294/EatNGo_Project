'use strict';

import { createStackNavigator, createAppContainer } from 'react-navigation';

// Screen imports
import WelcomeScreen from './WelcomeScreen';

const AppNavigator = createStackNavigator(
  {
    Welcome: { screen: WelcomeScreen },
  },
  {
    initialRouteName: 'Welcome'
  },
  
);

const App = createAppContainer(AppNavigator);
export default App;