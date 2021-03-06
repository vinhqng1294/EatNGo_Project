
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
import OrderDetailScreen from './Screen/OrderDetailScreen';
import ActiveOrderDetailScreen from './Screen/ActiveOrderDetailScreen';
import StoreListScreen from './Screen/Employee/StoreListScreen';
import OrderListScreen from './Screen/Employee/OrderListScreen';
import EmployeeOrderDetailScreen from './Screen/Employee/EmployeeOrderDetailScreen';
import AddCardScreen from './Screen/AddCardScreen';
import EditProfileScreen from './Screen/EditProfileScreen';
import RatingScreen from './Screen/RatingScreen';
import ScanQRScreen from './Screen/Employee/ScanQRScreen';


const HomeStack = createStackNavigator(
    {
        "Restaurants": { screen: HomeScreen },
        "Menu": { screen: MenuScreen },
        "FoodDetail": { screen: FoodDetailScreen },
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

const ProfileStack = createStackNavigator(
    {
        "Profile": { screen: ProfileScreen },
    },
    {
        initialRouteName: 'Profile'
    }
);
const StoreStack = createStackNavigator(
    {
        "StoreList": { screen: StoreListScreen },
        "ScanQR": { screen: ScanQRScreen },
    },
    {
        initialRouteKey: 'StoreList'
    }
);




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
        initialRouteName: "Restaurants",
    }
);


const SecondTabNavigator = createBottomTabNavigator(
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
        initialRouteName: "Active Orders",
    }
);

const EmployeeTabNavigator = createBottomTabNavigator(
    {
        "Stores": StoreStack,
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
                if (routeName === 'Stores') {
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
        initialRouteName: "Stores",
    }
);




const AppNavigator = createStackNavigator(
    {
        "Welcome": { screen: WelcomeScreen, navigationOptions: { header: null } },
        "EmployeeHome": { screen: EmployeeTabNavigator, navigationOptions: { header: null, } },
        "Register": { screen: RegisterScreen },
        'EmployeeOrderList': { screen: OrderListScreen },
        "Home": { screen: TabNavigator, navigationOptions: { header: null, } },
        "Active-Order": { screen: SecondTabNavigator, navigationOptions: { header: null, } },
        // "Menu": { screen: MenuScreen },
        // "FoodDetail": { screen: FoodDetailScreen },
        "OrderDetail": { screen: OrderDetailScreen },
        "ActiveOrderDetail": { screen: ActiveOrderDetailScreen },
        "EmployeeOrderDetail": { screen: EmployeeOrderDetailScreen },
        "EditProfile": { screen: EditProfileScreen },
        "Rating": { screen: RatingScreen },
    },
    {
        initialRouteName: 'Welcome',
    },
);
let Navigation = createAppContainer(AppNavigator);

export default Navigation