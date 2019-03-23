import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    FlatList,
    ImageBackground,
    Text,
    ScrollView,
    StatusBar,
    Image,
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Badge, Button, Divider } from 'react-native-elements';

class ActiveOrderScreen extends Component {
    constructor(props) {
        super(props)
    }
    static navigationOptions = ({ navigation }) => {
        return {
            headerTintColor: '#54b33d',
            headerStyle: { backgroundColor: 'white' },
            headerRight: <View></View>,
            headerLeft: <View></View>,
            headerTitle:
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'stretch',
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
                    }} >Active Order</Text>
                </View>
        };
    };

    render() {
        // this.props.navigation.setParams({
        //     cartLength: this.props.cart.length || 0,
        // })


        return (
            // IF LIST IS EMPTY
            // <View style={{
            //     flex: 1,
            //     justifyContent: 'center',
            //     alignItems: 'center',
            // }}>
            //     <StatusBar backgroundColor="#54b33d" barStyle="light-content" />
            //     <Text style={{
            //         textAlign: 'center',
            //         fontSize: 15,
            //         fontFamily: 'Quicksand-Regular',
            //     }}>There is no active orders at the moment.</Text>
            //     <Text style={{
            //         textAlign: 'center',
            //         fontSize: 15,
            //         fontFamily: 'Quicksand-Regular',
            //     }}>Help us to order somes.</Text>
            //     <Text style={{
            //         textAlign: 'center',
            //         fontSize: 15,
            //         fontFamily: 'Quicksand-Regular',
            //     }}>Thank you!</Text>
            //     <FontAwesome5
            //         style={{
            //             paddingTop: 10
            //         }}
            //         name={'hand-holding-heart'}
            //         size={23}
            //         color={'#54b33d'} />
            // </View>


            // IF LIST IS NOT EMPTY
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0)' }}>
                <StatusBar backgroundColor="#54b33d" barStyle="light-content" />
                <ScrollView style={styles.container}>
                    {/* an order item */}
                    <View style={styles.orderItemContainer}>
                        <View style={styles.leftContentWrapper}>
                            <View style={styles.restaurantNameWrapper}>
                                <Text numberOfLines={2} style={styles.resName}>Eat'n'Go Food Store</Text>
                            </View>
                            <View style={styles.orderIdWrapper}>
                                <Text numberOfLines={1} style={styles.orderId}>Order:
                                <Text numberOfLines={1} style={{
                                        fontFamily: 'Quicksand-Medium',
                                        fontSize: 15,
                                    }}>   11</Text></Text>
                            </View>
                            <View style={styles.orderIdWrapper}>
                                <Text numberOfLines={1} style={styles.orderId}>Status:
                                <Text numberOfLines={1} style={{
                                        fontFamily: 'Quicksand-Medium',
                                        fontSize: 15,
                                        paddingLeft: 10,
                                    }}>   Not checkout</Text></Text>
                            </View>
                            <View style={styles.viewDetailBtnWrapper}>
                                <TouchableOpacity style={styles.viewDetailBtn}>
                                    <View style={styles.iconWrapper}>
                                        <FontAwesome5
                                            style={styles.icons}
                                            name={'receipt'}
                                            size={23}
                                            color={'white'}
                                            solid
                                        />
                                    </View>
                                    <Text numberOfLines={1} style={styles.buttonTitle}>Review Order</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.rightContentWrapper}>
                            <View style={styles.dateTimeWrapper}>
                                <View style={styles.dateWrapper}>
                                    <Text numberOfLines={1} style={styles.shortDate}>23 Mar</Text>
                                </View>
                                <View style={styles.timeWrapper}>
                                    <Text numberOfLines={1} style={styles.shortTime}>15:52</Text>
                                </View>
                            </View>
                            <View style={styles.removeBtnWrapper}>
                                <TouchableOpacity style={styles.removeBtn}>
                                    <View style={styles.iconWrapper}>
                                        <FontAwesome5
                                            style={styles.icons}
                                            name={'trash'}
                                            size={23}
                                            color={'#54b33d'}
                                            solid
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* another order item */}
                    <View style={styles.orderItemContainer}>
                        <View style={styles.leftContentWrapper}>
                            <View style={styles.restaurantNameWrapper}>
                                <Text numberOfLines={2} style={styles.resName}>Eat'n'Go Food Store</Text>
                            </View>
                            <View style={styles.orderIdWrapper}>
                                <Text numberOfLines={1} style={styles.orderId}>Order:
                                <Text numberOfLines={1} style={{
                                        fontFamily: 'Quicksand-Medium',
                                        fontSize: 15,
                                    }}>   11</Text></Text>
                            </View>
                            <View style={styles.orderIdWrapper}>
                                <Text numberOfLines={1} style={styles.orderId}>Status:
                                <Text numberOfLines={1} style={{
                                        fontFamily: 'Quicksand-Medium',
                                        fontSize: 15,
                                        paddingLeft: 10,
                                    }}>   Not checkout</Text></Text>
                            </View>
                            <View style={styles.viewDetailBtnWrapper}>
                                <TouchableOpacity style={styles.viewDetailBtn}>
                                    <View style={styles.iconWrapper}>
                                        <FontAwesome5
                                            style={styles.icons}
                                            name={'receipt'}
                                            size={23}
                                            color={'white'}

                                        />
                                    </View>
                                    <Text numberOfLines={1} style={styles.buttonTitle}>Review Order</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.rightContentWrapper}>
                            <View style={styles.dateTimeWrapper}>
                                <View style={styles.dateWrapper}>
                                    <Text numberOfLines={1} style={styles.shortDate}>23 Mar</Text>
                                </View>
                                <View style={styles.timeWrapper}>
                                    <Text numberOfLines={1} style={styles.shortTime}>15:52</Text>
                                </View>
                            </View>
                            <View style={styles.removeBtnWrapper}>
                                <TouchableOpacity style={styles.removeBtn}>
                                    <View style={styles.iconWrapper}>
                                        <FontAwesome5
                                            style={styles.icons}
                                            name={'trash'}
                                            size={23}
                                            color={'#54b33d'}
                                            solid
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* end of order */}
                    <Divider style={styles.divider} />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    orderItemContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 10,
        marginBottom: 0,
        padding: 5,
        borderBottomWidth: 1.5,
        borderBottomColor: '#54b33d',
        borderRightWidth: 1.5,
        borderRightColor: '#54b33d',
        borderTopWidth: .5,
        borderTopColor: 'rgb(157,157,157)',
        borderLeftWidth: .5,
        borderLeftColor: 'rgb(157,157,157)',
        backgroundColor: 'white',
        borderRadius: 5,
    },
    leftContentWrapper: {
        flex: 5,
        flexDirection: 'column',
        // marginLeft: 5,
    },
    rightContentWrapper: {
        flex: 2,
        flexDirection: 'column',
    },
    restaurantNameWrapper: {
        flex: 1,
        marginBottom: 3,
        marginLeft: 5,
    },
    orderIdWrapper: {
        marginBottom: 3,
        flex: 1,
        marginLeft: 10,
    },
    viewDetailBtnWrapper: {
        marginBottom: 3,
        marginTop: 5,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    dateTimeWrapper: {
        marginBottom: 3,
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    removeBtnWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    resName: {
        fontFamily: 'Quicksand-Medium',
        fontSize: 17,
    },
    orderId: {
        fontFamily: 'Quicksand-Regular',
        fontSize: 15,
    },
    viewDetailBtn: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#54b33d',
        marginLeft: 30,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 3,
    },
    dateWrapper: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    timeWrapper: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    removeBtn: {
        padding: 3,
    },
    shortDate: {
        fontFamily: 'Quicksand-Medium',
        fontSize: 15,
    },
    shortTime: {
        fontFamily: 'Quicksand-Regular',
        fontSize: 15,
    },

    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#EBEBEB',
    },

    buttonTitle: {
        marginLeft: 7,
        fontFamily: 'Quicksand-Bold',
        fontSize: 15,
        color: 'white',
        textAlignVertical: 'center',
    },
    iconWrapper: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        textAlignVertical: 'center',
    },
    divider: {
        backgroundColor: '#54b33d',
        height: .7,
        marginTop: 15,
    },
});

export default ActiveOrderScreen;