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

class AddPaymentCardScreen extends Component {
    
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
                        marginLeft: 45,
                        marginRight: 45,
                        borderBottomWidth: .7,
                        borderBottomColor: '#54b33d',
                    }} >Add Payment Card</Text>
                </View>
        };
    };

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0)' }}>
                <StatusBar backgroundColor="#54b33d" barStyle="light-content" />
                
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

export default AddPaymentCardScreen;