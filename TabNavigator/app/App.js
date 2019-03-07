import React from 'react';
import { Text, View, Button } from 'react-native';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';

import HomeScreen from './HomeScreen';
import ActiveOrderScreen from './ActiveOrderScreen';
import ProfileScreen from './ProfileScreen';

const HomeStack = createStackNavigator({
  "Home": {screen: HomeScreen},
});

const ActiveOrderStack = createStackNavigator({
  "Active Orders": {screen: ActiveOrderScreen},
});

const ProfileStack = createStackNavigator({
  "Profile": {screen: ProfileScreen},
});

const TabNavigator = createBottomTabNavigator(
  {
    "Home": HomeStack,
    "Active Orders": ActiveOrderStack,
    "Profile": ProfileStack,
  },
  {
    tabBarOptions: {
      activeTintColor: 'green',
      inactiveTintColor: 'gray',
    }
  }
);

const App = createAppContainer(TabNavigator);

export default App;