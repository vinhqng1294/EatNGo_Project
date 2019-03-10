// 'use strict';



// // Screen imports

import { createStackNavigator, createAppContainer } from 'react-navigation';
import WelcomeScreen from './Screen/WelcomeScreen';
import RegisterScreen from './Screen/RegisterScreen';
import HomeScreen from './Screen/HomeScreen';

const AppNavigator = createStackNavigator(
    {
        Welcome: { screen: WelcomeScreen },
        Register: { screen: RegisterScreen },
        Home: { screen: HomeScreen }
    },
    {
        initialRouteName: 'Welcome'
    },
);
let Navigation = createAppContainer(AppNavigator);

export default Navigation