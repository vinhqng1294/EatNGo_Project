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
    Dimensions,
} from 'react-native';

import CheckBox from 'react-native-check-box';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Badge, Button, Divider } from 'react-native-elements';

export default class MenuScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTintColor: '#54b33d',
            headerStyle: { backgroundColor: 'white' },
            headerRight:
                <View style={{
                    height: 0,
                    width: 0,
                    borderBottomWidth: 28,
                    borderBottomColor: '#54b33d',
                    borderTopWidth: 28,
                    borderTopColor: '#54b33d',
                    borderLeftWidth: 28,
                    borderLeftColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 0,
                    // backgroundColor: 'black',
                }}></View>,
            headerLeft:
                <View style={{
                    height: 0,
                    width: 0,
                    borderBottomWidth: 28,
                    borderBottomColor: '#54b33d',
                    borderTopWidth: 28,
                    borderTopColor: '#54b33d',
                    borderRightWidth: 28,
                    borderRightColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 0,
                    // backgroundColor: 'black',
                }}></View>,
            headerTitle:
                <View style={{
                    // justifyContent: 'center',
                    alignItems: 'flex-start',
                    flex: 1,
                    flexDirection: 'row',
                    borderBottomWidth: .7,
                    borderBottomColor: '#54b33d',
                    // backgroundColor: 'black',
                }}>
                    <Text numberOfLines={1} style={{
                        flex: 1,
                        fontFamily: 'Quicksand-Bold',
                        fontSize: 18,
                        paddingLeft: 10,
                        color: '#757575',
                        // backgroundColor: 'yellow',
                    }}> ORDER</Text>
                    <Text numberOfLines={1} style={{
                        flex: 2.7,
                        fontFamily: 'Quicksand-Medium',
                        fontSize: 18,
                        textAlign: 'center',
                        paddingRight: 10,
                        color: '#757575',
                        textAlignVertical: 'center',
                        // backgroundColor: 'black',
                    }} > #A12345</Text>
                </View>
        };
    };

    componentDidMount() {
        this.props.navigation.setParams({
            notiValue: 1,
        });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar backgroundColor="#54b33d" barStyle="light-content" />
                <ScrollView style={styles.container}>
                    <View style={styles.addMoreItemContainer}>
                        <TouchableOpacity style={styles.addMoreItemWrapper}
                            onPress={() => { this.props.navigation.navigate('Menu') }}>
                            <View style={styles.iconWrapper}>
                                <FontAwesome5
                                    style={styles.icons}
                                    name={'hand-point-right'}
                                    size={14}
                                    color={'#54b33d'}
                                    solid
                                />
                            </View>
                            <Text numberOfLines={1} style={styles.addMoreItemTxt}>Order more here ...</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.orderItemsContainer}>

                        {/* Flat list items */}
                        <View style={styles.orderItemWrapper}>
                            <View style={styles.mainItemContainer}>
                                <View style={styles.quantityWrapper}>
                                    <Text numberOfLines={1} style={styles.quantity}>1 x</Text>
                                </View>
                                <View style={styles.foodNameWrapper}>
                                    <Text numberOfLines={2} style={styles.foodName}>Banh Trang Tron khong Trung</Text>
                                </View>
                                <View style={styles.priceWrapper}>
                                    <Text numberOfLines={1} style={styles.price}>$ 5.99</Text>
                                </View>
                                <TouchableOpacity style={styles.removeBtnContainer}>
                                    <View style={styles.removeBtn}>
                                        <FontAwesome5
                                            name={'trash-alt'}
                                            color={'#54b33d'}
                                            size={12}
                                            solid
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>

                            {/* extra item container*/}
                            <View>
                                {/* extra item */}
                                <View style={styles.extraTitleWrapper}>
                                    <View style={{ flex: 1, paddingLeft: 3, }}></View>
                                    <Text numberOfLines={1} style={styles.extraTitle}>Size</Text>
                                </View>
                                <View style={styles.extraItemContainer}>
                                    <View style={styles.extraQuantityWrapper}>
                                    </View>
                                    <View style={styles.extraDetailWrapper}>
                                        <Text numberOfLines={1} style={styles.extraItem}>+ Small</Text>
                                    </View>
                                    <View style={styles.priceWrapper}>
                                        <Text numberOfLines={1} style={styles.extraPrice}>$ 5.99</Text>
                                    </View>
                                    <TouchableOpacity style={styles.removeBtnContainer}>
                                        <View style={styles.removeBtn}>
                                            <FontAwesome5
                                                name={'times'}
                                                color={'#54b33d'}
                                                size={12}
                                                solid
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                {/* extra item */}
                                <View style={styles.extraTitleWrapper}>
                                    <View style={{ flex: 1, paddingLeft: 3, }}></View>
                                    <Text numberOfLines={1} style={styles.extraTitle}>Toppings</Text>
                                </View>
                                <View style={styles.extraItemContainer}>
                                    <View style={styles.extraQuantityWrapper}>
                                    </View>
                                    <View style={styles.extraDetailWrapper}>
                                        <Text numberOfLines={1} style={styles.extraItem}>+ Black pearls</Text>
                                    </View>
                                    <View style={styles.priceWrapper}>
                                        <Text numberOfLines={1} style={styles.extraPrice}>$ 5.99</Text>
                                    </View>
                                    <TouchableOpacity style={styles.removeBtnContainer}>
                                        <View style={styles.removeBtn}>
                                            <FontAwesome5
                                                name={'times'}
                                                color={'#54b33d'}
                                                size={12}
                                                solid
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.extraItemContainer}>
                                    <View style={styles.extraQuantityWrapper}>
                                    </View>
                                    <View style={styles.extraDetailWrapper}>
                                        <Text numberOfLines={1} style={styles.extraItem}>+ lychee jellys</Text>
                                    </View>
                                    <View style={styles.priceWrapper}>
                                        <Text numberOfLines={1} style={styles.extraPrice}>$ 5.99</Text>
                                    </View>
                                    <TouchableOpacity style={styles.removeBtnContainer}>
                                        <View style={styles.removeBtn}>
                                            <FontAwesome5
                                                name={'times'}
                                                color={'#54b33d'}
                                                size={12}
                                                solid
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* comments */}
                            <View style={styles.extraTitleWrapper}>
                                <Text numberOfLines={1} style={styles.extraTitle}>Special Requests</Text>
                            </View>
                            <View style={styles.extraItemContainer}>
                                <View style={styles.commentWrapper}>
                                    <Text numberOfLines={5} style={styles.extraItem}>nhieu da, nhieu ot, nhieu rau, sdas, asd, as,d a,sdasd, ,asd,as</Text>
                                </View>
                                <TouchableOpacity style={styles.removeBtnContainer}>
                                    <View style={styles.removeBtn}>
                                        <FontAwesome5
                                            name={'times'}
                                            color={'#54b33d'}
                                            size={12}
                                            solid
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.orderItemWrapper}>
                            <View style={styles.mainItemContainer}>
                                <View style={styles.quantityWrapper}>
                                    <Text numberOfLines={1} style={styles.quantity}>1 x</Text>
                                </View>
                                <View style={styles.foodNameWrapper}>
                                    <Text numberOfLines={2} style={styles.foodName}>Banh Trang Tron khong Trung</Text>
                                </View>
                                <View style={styles.priceWrapper}>
                                    <Text numberOfLines={1} style={styles.price}>$ 5.99</Text>
                                </View>
                                <TouchableOpacity style={styles.removeBtnContainer}>
                                    <View style={styles.removeBtn}>
                                        <FontAwesome5
                                            name={'trash-alt'}
                                            color={'#54b33d'}
                                            size={12}
                                            solid
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>

                            {/* extra item */}

                        </View>
                        <View style={styles.orderItemWrapper}>
                            <View style={styles.mainItemContainer}>
                                <View style={styles.quantityWrapper}>
                                    <Text numberOfLines={1} style={styles.quantity}>15 x</Text>
                                </View>
                                <View style={styles.foodNameWrapper}>
                                    <Text numberOfLines={2} style={styles.foodName}>Banh Trang Tron khong Trung</Text>
                                </View>
                                <View style={styles.priceWrapper}>
                                    <Text numberOfLines={1} style={styles.price}>$ 5.99</Text>
                                </View>
                                <TouchableOpacity style={styles.removeBtnContainer}>
                                    <View style={styles.removeBtn}>
                                        <FontAwesome5
                                            name={'trash-alt'}
                                            color={'#54b33d'}
                                            size={12}
                                            solid
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>

                            {/* extra item */}

                        </View>
                    
                    </View>
                    <Divider style={styles.divider} />

                    <TouchableOpacity style={styles.longBtn}>
                        <View style={styles.iconWrapper}>
                            <FontAwesome5
                                style={styles.icons}
                                name={'credit-card'}
                                size={23}
                                color={'#54b33d'}
                                solid
                            />
                        </View>
                        <Text numberOfLines={1} style={styles.iconText}>Add Credit Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.longBtn}>
                        <View style={styles.iconWrapper}>
                            <FontAwesome5
                                style={styles.icons}
                                name={'gifts'}
                                size={23}
                                color={'#54b33d'}
                                solid
                            />
                        </View>
                        <Text numberOfLines={1} style={styles.iconText}>Apply Coupon Code</Text>
                    </TouchableOpacity>
                    <Divider style={styles.divider} />

                    <View style={styles.priceSummaryContainer}>
                        <View style={styles.priceSummaryWrapper}>
                            <Text numberOfLines={1} style={styles.priceInfoTxt}>Sub-total</Text>
                            <Text numberOfLines={1} style={styles.priceInfo}>20.99</Text>
                        </View>
                        <View style={styles.priceSummaryWrapper}>
                            <Text numberOfLines={1} style={styles.priceInfoTxt}>Discount</Text>
                            <Text numberOfLines={1} style={styles.priceInfo}>-10.99</Text>
                        </View>
                        <View style={styles.totalWrapper}>
                            <Text numberOfLines={1} style={styles.totalTxt}>Total</Text>
                            <Text numberOfLines={1} style={styles.total}>$ 20.99</Text>
                        </View>
                    </View>
                </ScrollView>
                <TouchableOpacity style={styles.checkoutBtn}
                    onPress={() => { this.props.navigation.navigate('Restaurants') }}>
                    <View style={styles.iconWrapper}>
                        <FontAwesome5
                            style={styles.icons}
                            name={'cash-register'}
                            size={23}
                            color={'white'}
                            solid
                        />
                    </View>
                    <Text numberOfLines={1} style={styles.buttonTitle}>Checkout</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    orderItemWrapper: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        borderBottomColor: '#54b33d',
        borderBottomWidth: .57,
        paddingBottom: 3,
        paddingTop: 3,
    },
    mainItemContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    quantityWrapper: {
        flex: 1,
        paddingLeft: 5,
    },
    foodNameWrapper: {
        flex: 8,
        paddingLeft: 3,
        paddingRight: 3,
    },
    priceWrapper: {
        flex: 2,
        paddingLeft: 10,
    },
    removeBtnContainer: {
        flex: 1,
        alignItems: 'center',
    },
    removeBtn: {
        paddingTop: 5,
    },
    extraTitleWrapper: {
        flex: 1,
        flexDirection: 'row',
    },
    extraItemContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    extraQuantityWrapper: {
        flex: 1,
        alignItems: 'flex-end',
        paddingLeft: 3,
    },
    extraDetailWrapper: {
        flex: 8,
        paddingLeft: 3,
        paddingRight: 3,
    },
    quantity: {
        fontFamily: 'Quicksand-Medium',
        fontSize: 15,
        color: 'gray',
    },
    foodName: {
        fontFamily: 'Quicksand-Medium',
        fontSize: 15,
        color: 'black',
    },
    price: {
        fontFamily: 'Quicksand-Medium',
        fontSize: 15,
        color: 'gray',
    },
    extraTitle: {
        flex: 11,
        paddingLeft: 10,
        paddingRight: 3,
        fontFamily: 'Quicksand-Medium',
        fontSize: 13,
        color: 'gray',
    },
    extraItem: {
        paddingLeft: 20,
        fontFamily: 'Quicksand-Regular',
        fontSize: 13,
        color: 'gray',
    },
    extraPrice: {
        fontFamily: 'Quicksand-Medium',
        fontSize: 13,
        color: 'gray',
        paddingLeft: 3,
    },
    commentWrapper: {
        flex: 11,
        paddingLeft: 13,
        paddingRight: 3,
        fontFamily: 'Quicksand-Medium',
        fontSize: 13,
        color: 'gray',
    },


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
    iconWrapper: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        textAlignVertical: 'center',
        // backgroundColor: 'green'
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
    checkoutBtn: {
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        left: Dimensions.get('window').width / 2,
        bottom: 10,
        zIndex: 100,
        transform: [{ 'translateX': -300 / 2 }],
        backgroundColor: 'rgba(84, 179, 61, .8)',
        width: 300,
        height: 40,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        textAlignVertical: 'center',
        padding: 10,
        borderWidth: .3,
        borderColor: '#54b33d',
    },
    buttonTitle: {
        marginLeft: 15,
        marginRight: 10,
        fontFamily: 'Quicksand-Bold',
        fontSize: 15,
        color: 'white',
        textAlignVertical: 'center',
    },

});