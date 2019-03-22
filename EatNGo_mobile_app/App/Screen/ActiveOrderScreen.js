import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    FlatList,
    Image,
    Text,
} from 'react-native';

type Props = {};
export default class ActiveOrderScreen extends Component<Props> {
    render() {
        return (
            <View style={{flex: 1}}>
                <Text style={styles.normalText}>Active Order Screen</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#EBEBEB',
        // height: 1000
    },
    orderItemsContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        borderRadius: 9,
        margin: 15,
        padding: 10,
        borderWidth: .3,
        borderColor: '#54b33d'
    },
    orderItemWrapper: {
        flex: 1,
        flexDirection: 'row',
        // backgroundColor: 'red',
        // borderRadius: 10,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'stretch',
        borderBottomColor: '#54b33d',
        borderBottomWidth: .57,
        paddingBottom: 3,
        paddingTop: 3,
    },
    textWrapper: {
        flex: 8,
        flexDirection: 'row',
        // backgroundColor: 'yellow',
    },
    iconWrapper: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        textAlignVertical: 'center',
        // backgroundColor: 'green'
    },
    quantity: {
        flex: 1,
        // backgroundColor: 'green',
        fontFamily: 'Quicksand-Medium',
        fontSize: 15,
        textAlignVertical: 'center',
        color: 'gray',
        paddingLeft: 3,
    },
    foodName: {
        flex: 5,
        fontFamily: 'Quicksand-Medium',
        fontSize: 15,
        textAlignVertical: 'center',
        color: 'black',
    },
    price: {
        flex: 2,
        // backgroundColor: 'green',
        fontFamily: 'Quicksand-Medium',
        fontSize: 15,
        textAlignVertical: 'center',
        textAlign: 'center',
        color: 'gray',
    },
    iconButtonWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlignVertical: 'center',
        // backgroundColor: 'green',
    },
    divider: {
        backgroundColor: '#54b33d',
        height: .7,
        marginBottom: 15,
    },
    longBtn: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 9,
        margin: 15,
        marginTop: 0,
        padding: 10,
        borderWidth: .3,
        borderColor: '#54b33d',
        justifyContent: 'flex-start',
    },
    icons: {
        // backgroundColor: 'black',
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconText: {
        marginLeft: 15,
        fontFamily: 'Quicksand-Bold',
        fontSize: 15,
        color: '#54b33d',
        textAlignVertical: 'center',
    },
    addMoreItemContainer: {
        flex: 1,
        flexDirection: 'column',
        // backgroundColor: 'yellow',
        justifyContent: 'center',
        margin: 15,
        marginBottom: 0,
        alignItems: 'flex-end',
    },
    addMoreItemWrapper: {
        flex: 0,
        flexDirection: 'row',
        // backgroundColor: 'red',
    },
    addMoreItemTxt: {
        flex: 0,
        textAlignVertical: 'center',
        marginLeft: 15,
        marginRight: 15,
        fontFamily: 'Quicksand-Medium',
        fontSize: 15,
        color: '#54b33d',
    },
    btnContentWrapper: {
        flex: 0,
        flexDirection: 'row',
        backgroundColor: 'black',
    },
    priceSummaryContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#EBEBEB',
        margin: 15,
        marginTop: 0,
        padding: 10,
        // borderWidth: .3,
        // borderColor: '#54b33d',
    },
    priceSummaryWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'center',
        // backgroundColor: 'green',
        marginLeft: 3,
        marginRight: 3,
    },
    totalWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'center',
        // backgroundColor: 'green',
        marginTop: 5,
        borderTopWidth: .5,
        borderTopColor: '#757575',
        paddingTop: 3,
    },
    priceInfoTxt: {
        flex: 1,
        fontFamily: 'Quicksand-Regular',
        fontSize: 15,
        color: '#757575',
        textAlign: 'left',
    },
    priceInfo: {
        flex: 1,
        fontFamily: 'Quicksand-Regular',
        fontSize: 15,
        color: '#757575',
        textAlign: 'right',
    },
    totalTxt: {
        flex: 1,
        fontFamily: 'Quicksand-Medium',
        fontSize: 18,
        color: 'black',
        textAlign: 'left',
    },
    total: {
        flex: 1,
        fontFamily: 'Quicksand-Bold',
        fontSize: 18,
        color: '#54b33d',
        textAlign: 'right',
    },
    buttonTitle: {
        marginLeft: 15,
        marginRight: 10,
        fontFamily: 'Quicksand-Bold',
        fontSize: 15,
        color: 'white',
        textAlignVertical: 'center',
    },
    normalText: {
        fontSize: 18,
        fontFamily: 'Quicksand',
    },
});
