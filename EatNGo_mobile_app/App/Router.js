
import React from 'react'
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import WelcomeScreen from './Screen/WelcomeScreen';
import RegisterScreen from './Screen/RegisterScreen';
import HomeScreen from './Screen/HomeScreen';
import ActiveOrderScreen from './Screen/ActiveOrderScreen';
import ProfileScreen from './Screen/ProfileScreen';
import MenuScreen from './Screen/MenuScreen';
import FoodDetailScreen from './Screen/FoodDetailScreen';


const HomeStack = createStackNavigator(
    {
        "Restaurants": { screen: HomeScreen },
        // "Menu": { screen: MenuScreen },
        // "FoodDetail": { screen: FoodDetailScreen },
    },
    {
        initialRouteName: 'Restaurants',

        // headerMode: 'none'
    }
);

const ActiveOrderStack = createStackNavigator(
    {
        "Active Orders": { screen: ActiveOrderScreen },
    },
    {
        initialRouteName: 'Active Orders',
    }
);

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
                return <IconComponent name={iconName} size={20} color={tintColor} solid />;
            },
            
        }),
    }
);

const AppNavigator = createStackNavigator(
    {
        "Welcome": { screen: WelcomeScreen, navigationOptions: { header: null } },
        "Register": { screen: RegisterScreen },
        "Home": { screen: TabNavigator, navigationOptions: { header: null, } },
        "Menu": { screen: MenuScreen },
        "FoodDetail": { screen: FoodDetailScreen },
    },
    {
        initialRouteName: 'Welcome',
    },
);
let Navigation = createAppContainer(AppNavigator);

export default Navigation