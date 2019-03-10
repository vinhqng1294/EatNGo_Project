import React from 'react';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import HomeScreen from './HomeScreen';
import ActiveOrderScreen from './ActiveOrderScreen';
import ProfileScreen from './ProfileScreen';

const HomeStack = createStackNavigator({
  "Restaurants": { screen: HomeScreen },
});

const ActiveOrderStack = createStackNavigator({
  "Active Orders": { screen: ActiveOrderScreen },
});

const ProfileStack = createStackNavigator({
  "Profile": { screen: ProfileScreen },
});

const TabNavigator = createBottomTabNavigator(
  {
    "Restaurants": HomeStack,
    "Active Orders": ActiveOrderStack,
    "Profile": ProfileStack,
  },
  {
    tabBarOptions: {
      activeTintColor: '#54b33d',
      inactiveTintColor: 'gray',
      labelStyle: {
        fontSize: 13,
        fontFamily: 'Quicksand-Medium',
      },
    },
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = FontAwesome5;
        let iconName;
        if (routeName === 'Restaurants') {
          iconName = 'store';
        } else if (routeName === 'Profile') {
          iconName = `user`;
        } else if (routeName === 'Active Orders') {
          iconName = `dolly`;
          // Sometimes we want to add badges to some icons. 
          // You can check the implementation below.
          // IconComponent = HomeIconWithBadge; 
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={20} color={tintColor} solid/>;
      },
    }),
  }
);

const App = createAppContainer(TabNavigator);

export default App;