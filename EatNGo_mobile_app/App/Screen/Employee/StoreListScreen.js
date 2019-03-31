import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Overlay, Button } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { authLogin } from '../../../actions/index'
// import { fetchStore, fetchMoreStores, searchStore } from '../../actions/index'
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    ImageBackground,
    TouchableOpacity,
    FlatList
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import firebase from 'react-native-firebase';
import type { Notification, NotificationOpen } from 'react-native-firebase';
import { getStatusString } from '../../../utils/index'

class StoreListScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            storeList: [],
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTintColor: '#54b33d',
            headerStyle: { backgroundColor: 'white' },
            headerRight: <View style={{
                justifyContent: "center",
                alignItems: "center",
                paddingRight: 10,
            }}>
                <TouchableOpacity style={{
                    padding: 3,
                    backgroundColor: '#54b33d',
                    borderRadius: 999,
                    paddingRight: 10,
                    paddingLeft: 10,
                }} onPress={() => { navigation.navigate('ScanQR') }}>
                    <Text style={{
                        fontFamily: 'Quicksand-Bold',
                        fontSize: 15,
                        color: 'white',
                    }}>Scan QR</Text>
                </TouchableOpacity>
            </View>,
            headerLeft: null,
            headerTitle:
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                }}>
                    <Text numberOfLines={1} style={{
                        fontFamily: 'Quicksand-Medium',
                        fontSize: 20,
                        textAlign: 'center',
                        color: '#54b33d',
                        marginLeft: 50,
                        marginRight: 50,
                        borderBottomWidth: .7,
                        borderBottomColor: '#54b33d',
                    }} >Stores</Text>
                </View>
        };
    };


    handleViewOrder(store) {
        this.props.navigation.navigate('EmployeeOrderList', {
            store: store
        })
    }

    componentWillUnmount() {
        this.notificationListener();
        this.notificationOpenedListener();
    }

    componentDidMount() {
        this.createNotificationListeners()
        // const { user } = this.props;
        // this.setState({
        //     storeList: user.storesEmployedIn ? user.storesEmployedIn : []
        // })
        // this.props.storeList = user.storesEmployedIn ? user.storesEmployedIn : []
        // if (!storeList || !storeList.length) {
        //     this.props.fetchStore();
        // }

        // this.props.navigation.setParams({
        //     searchValue: '',
        //     handleSearch: this.handleSearch.bind(this)
        // });
    }

    async createNotificationListeners() {

        this.notificationListener = firebase.notifications().onNotification((notification: Notification) => {
            console.log(notification)
        });

        this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
            const notification = notificationOpen.notification;
            if (notification.data.type === 'HAS_NEW_ORDER') {
                this.props.navigation.navigate("EmployeeOrderDetail", {
                    id: notification.data.orderId,
                    onGoBack: () => { }
                });
            }
            else {
                this.props.navigation.navigate("ActiveOrderDetail", {
                    id: notification.data.orderId,
                });
            }
        });
        this.messageListener = firebase.messaging().onMessage((message) => {
            const channel = new firebase.notifications.Android.Channel(
                'channelId',
                'Channel Name',
                firebase.notifications.Android.Importance.Max
            ).setDescription('A natural description of the channel');
            firebase.notifications().android.createChannel(channel);
            const notification = new firebase.notifications.Notification({
                sound: 'default',
                show_in_foreground: true,
            })
                .setNotificationId('notificationId')
                .setTitle('EatNGo')
                .setData(message.data)
                // .setBody(`Your order #${message.data.orderId} is ${getStatusString(message.data.type)}`)
                .setBody(message.data.type === 'HAS_NEW_ORDER' ? 'You have new order' : `Your order #${message.data.orderId} is ${getStatusString(message.data.type)}`)
                .android.setChannelId('test-channel')
                .android.setSmallIcon('ic_launcher')
                .android.setPriority(firebase.notifications.Android.Priority.High);

            firebase.notifications()
                .displayNotification(notification)
                .catch(err => console.error(err));
        });
    }



    // handleSearch(value) {
    //     this.props.searchStore(value)
    // }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar style={{
                }} backgroundColor="#54b33d" barStyle="light-content" />
                <FlatList
                    data={this.props.user ? this.props.user.storesEmployedIn : []}
                    refreshing={this.props.isLoadingStores}
                    onRefresh={() => {
                        this.props.authLogin(this.props.user.phoneNumber, this.props.user.facebookId)
                    }}
                    showsHorizontalScrollIndicator={true}
                    renderItem={({ item }) =>
                        <ImageBackground
                            style={styles.row}
                            source={item.image ? { uri: item.image } : require('../../../Assets/resDefault_1.png')}
                            imageStyle={item.image ? { resizeMode: 'cover' } : { resizeMode: 'contain' }}
                        >
                            <View style={item.image ? styles.rowContent : styles.rowContentNoImage}>
                                <View style={styles.restaurantNameContainer}>
                                    <Text numberOfLines={1} style={styles.restaurantName}>
                                        {item.name}
                                    </Text>
                                </View>
                                <View style={styles.miniDetailsContainer}>
                                    <View style={styles.distance}>
                                        <Text numberOfLines={1} style={styles.distanceTxt}>
                                            {item.phone}
                                        </Text>
                                        <Text numberOfLines={1} style={styles.streetName}>
                                            Active Orders: {item.activeOrderCount}
                                        </Text>

                                    </View>
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={() => {
                                            this.handleViewOrder(item)
                                        }}
                                    >
                                        <Text style={styles.btnText}>View Orders</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ImageBackground>
                    }

                />
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#EBEBEB',
    },
    row: {
        flex: 0,
        backgroundColor: 'rgba(0, 0, 0, .6)',
        height: 110,
        width: null,
        margin: 5,
        // resizeMode: 'contain',
    },
    rowContentNoImage: {
        backgroundColor: 'rgba(84, 179, 61, .27)',
        flex: 0,
        height: 110,
        width: null,
    },
    rowContent: {
        backgroundColor: 'rgba(0, 0, 0, .6)',
        flex: 0,
        height: 110,
        width: null,
    },
    normalText: {
        fontSize: 18,
        fontFamily: 'Quicksand-Regular',
    },
    restaurantNameContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, .0)',
    },
    restaurantName: {
        textAlign: 'center',
        fontFamily: 'Quicksand-Medium',
        fontSize: 22,
        color: '#EBEBEB',
        padding: 3,
        width: null,
        height: null,
    },
    miniDetailsContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'rgba(84, 179, 61, .2)',
        marginTop: 10,
        marginBottom: 10,
    },
    distance: {
        flex: 1,
        marginLeft: 5,
        marginRight: 5,
        justifyContent: 'center',
        alignItems: 'flex-start',
        // backgroundColor: 'gray',
    },
    distanceTxt: {
        textAlign: 'center',
        fontFamily: 'Quicksand-Medium',
        fontSize: 15,
        color: '#EBEBEB',
        // backgroundColor: 'green',
        marginLeft: 10,
    },
    streetName: {
        textAlign: 'left',
        fontFamily: 'Quicksand-Regular',
        fontSize: 15,
        color: '#EBEBEB',
        // backgroundColor: 'green',
        marginLeft: 10,
        // width: 190,
        maxWidth: 190,
    },
    button: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
    },
    btnText: {
        backgroundColor: '#54b33d',
        padding: 5,
        color: '#EBEBEB',
        fontFamily: 'Quicksand-Bold',
        fontSize: 15,
        borderWidth: 0,
    }
});
const mapStateToProps = (state) => {
    return {
        user: state.authReducer.user,
        isLoadingStores: state.authReducer.isLoadingStores,
    }
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        authLogin
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(StoreListScreen);


