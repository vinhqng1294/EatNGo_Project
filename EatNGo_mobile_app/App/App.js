'use strict';

import { createStackNavigator, createAppContainer } from 'react-navigation';

// Screen imports
import WelcomeScreen from './WelcomeScreen';
import ConfirmRegisterScreen from './ConfirmRegisterScreen';

const AppNavigator = createStackNavigator(
  {
    Welcome: { screen: ConfirmRegisterScreen },
    ConfirmRegister: { screen: ConfirmRegisterScreen }
  },
  {
    initialRouteName: 'Welcome'
  },

);

const App = createAppContainer(AppNavigator);
export default App;