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
    TextInput,
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CheckBox from 'react-native-check-box';
import NumericInput from 'react-native-numeric-input';
import ActionButton from 'react-native-action-button';

export default class MenuScreen extends Component {
    constructor() {
        super();
        this.state = {
            checked: true,
            radioButton: 'y1',
            food: [
                {
                    name: 'Banh Trang tron',
                    price: 13,
                    imgURL: require('../../Assets/resA.jpg'),
                    description: 'No Ice Added! Includes Strawberry, Blueberry, Banana, Pineapple (comes with Basil Seed Pudding and Flaxseed as topping).',
                    extraOptions: [
                        {
                            categoryName: 'Sauce',
                            items: [
                                {
                                    name: 'Egg',
                                    price: 1
                                },
                                {
                                    name: 'Banana',
                                    price: 2
                                }
                            ]
                        },
                        {
                            categoryName: 'Toppings',
                            items: [
                                {
                                    name: 'Topping 1',
                                    price: 3
                                },
                                {
                                    name: 'Topping 2',
                                    price: 4
                                }
                            ]
                        }

                    ]
                }
            ]
        };
    }
    render() {
        return (
            <ScrollView style={styles.container}>
                <StatusBar backgroundColor="#54b33d" barStyle="light-content" />
                {/* <ActionButton
                    buttonColor={'#54b33d'}
                    icon={<FontAwesome5 name={'plus'} size={20} color={'#EBEBEB'} solid />}
                /> */}

                <Image style={styles.foodImg}
                    source={this.state.food[0].imgURL} />
                <View style={styles.miniHeader}>
                    <Text numberOfLines={2} style={styles.foodName}>{this.state.food[0].name}</Text>
                    <Text numberOfLines={1} style={styles.foodPrice}>$ {this.state.food[0].price}</Text>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionTxt}>
                        {this.state.food[0].description}
                    </Text>
                </View>

                <View style={styles.extraContainer}>
                    <View style={styles.extraHeaderContainer}>
                        <Text style={styles.extraHeaderTxt}>
                            Size</Text>
                        <Text style={styles.extraInfoTxt}>
                            <FontAwesome5 name={'exclamation-circle'} size={13} color={'#54b33d'} solid />
                            {/* <FontAwesome5 name={'thumbs-up'} size={13} color={'#54b33d'} solid /> */}
                            {/* <FontAwesome5 name={'check'} size={13} color={'#54b33d'} solid /> */}
                            <Text> </Text>
                            Compulsory</Text>
                        {/* Recommend</Text> */}
                        {/* Optional</Text> */}

                    </View>
                    <View style={styles.extraItemContainer}>
                        <View style={styles.extraItemsContainer}>
                            <Text numberOfLines={1} style={styles.extraItemsName}>
                                Small</Text>
                            <Text numberOfLines={1} style={styles.extraItemsPrice}>
                                + $1.95</Text>
                            <CheckBox
                                style={styles.radioBtn}
                                onClick={() => { this.setState({ radioButton: 'y1' }) }}
                                isChecked={this.state.radioButton === 'y1'}
                                checkBoxColor='#54b33d'
                                checkedImage={<FontAwesome5 name={'dot-circle'} size={18} color={'#54b33d'} solid />}
                                unCheckedImage={<FontAwesome5 name={'circle'} size={18} color={'#54b33d'} />}
                            />
                        </View>
                        <View style={styles.extraItemsContainer}>
                            <Text numberOfLines={1} style={styles.extraItemsName}>
                                Medium</Text>
                            <Text numberOfLines={1} style={styles.extraItemsPrice}>
                                + $1.95</Text>
                            <CheckBox
                                style={styles.radioBtn}
                                onClick={() => { this.setState({ radioButton: 'y2' }) }}
                                isChecked={this.state.radioButton === 'y2'}
                                checkBoxColor='#54b33d'
                                checkedImage={<FontAwesome5 name={'dot-circle'} size={18} color={'#54b33d'} solid />}
                                unCheckedImage={<FontAwesome5 name={'circle'} size={18} color={'#54b33d'} />}
                            />
                        </View>
                        <View style={styles.extraItemsContainer}>
                            <Text numberOfLines={1} style={styles.extraItemsName}>
                                Large</Text>
                            <Text numberOfLines={1} style={styles.extraItemsPrice}>
                                + $1.95</Text>
                            <CheckBox
                                style={styles.radioBtn}
                                onClick={() => { this.setState({ radioButton: 'y3' }) }}
                                isChecked={this.state.radioButton === 'y3'}
                                checkBoxColor='#54b33d'
                                checkedImage={<FontAwesome5 name={'dot-circle'} size={18} color={'#54b33d'} solid />}
                                unCheckedImage={<FontAwesome5 name={'circle'} size={18} color={'#54b33d'} />}
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.extraContainer}>
                    <View style={styles.extraHeaderContainer}>
                        <Text style={styles.extraHeaderTxt}>
                            Toppings</Text>
                        <Text style={styles.extraInfoTxt}>
                            {/* <FontAwesome5 name={'exclamation-circle'} size={13} color={'#54b33d'} solid /> */}
                            <FontAwesome5 name={'thumbs-up'} size={13} color={'#54b33d'} solid />
                            {/* <FontAwesome5 name={'check'} size={13} color={'#54b33d'} solid /> */}
                            <Text> </Text>
                            {/* Compulsory</Text> */}
                            Recommend</Text>
                        {/* Optional</Text> */}

                    </View>
                    <View style={styles.extraItemContainer}>
                        <View style={styles.extraItemsContainer}>
                            <Text numberOfLines={1} style={styles.extraItemsName}>
                                Topping 1</Text>
                            <Text numberOfLines={1} style={styles.extraItemsPrice}>
                                + $9.95</Text>
                            <CheckBox
                                style={styles.checkbox}
                                onClick={() => { this.setState({ checked: !this.state.checked }) }}
                                isChecked={this.state.checked}
                                checkBoxColor='#54b33d'
                            />
                        </View>
                        <View style={styles.extraItemsContainer}>
                            <Text numberOfLines={1} style={styles.extraItemsName}>
                                Topping 2</Text>
                            <Text numberOfLines={1} style={styles.extraItemsPrice}>
                                + $7.95</Text>
                            <CheckBox
                                style={styles.checkbox}
                                onClick={() => { this.setState({ checked: !this.state.checked }) }}
                                isChecked={this.state.checked}
                                checkBoxColor='#54b33d'
                            />
                        </View>
                        <View style={styles.extraItemsContainer}>
                            <Text numberOfLines={1} style={styles.extraItemsName}>
                                Topping 3</Text>
                            <Text numberOfLines={1} style={styles.extraItemsPrice}>
                                + $8.95</Text>
                            <CheckBox
                                style={styles.checkbox}
                                onClick={() => { this.setState({ checked: !this.state.checked }) }}
                                isChecked={this.state.checked}
                                checkBoxColor='#54b33d'
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.extraContainer}>
                    <View style={styles.extraHeaderContainer}>
                        <Text style={styles.extraHeaderTxt}>
                            Toppings</Text>
                        <Text style={styles.extraInfoTxt}>
                            {/* <FontAwesome5 name={'exclamation-circle'} size={13} color={'#54b33d'} solid /> */}
                            {/* <FontAwesome5 name={'thumbs-up'} size={13} color={'#54b33d'} solid /> */}
                            <FontAwesome5 name={'check'} size={13} color={'#54b33d'} solid />
                            <Text> </Text>
                            {/* Compulsory</Text> */}
                            {/* Recommend</Text> */}
                            Optional</Text>

                    </View>
                    <View style={styles.extraItemContainer}>
                        <View style={styles.extraItemsContainer}>
                            <Text numberOfLines={1} style={styles.extraItemsName}>
                                Topping 1</Text>
                            <Text numberOfLines={1} style={styles.extraItemsPrice}>
                                + $9.95</Text>
                            <CheckBox
                                style={styles.checkbox}
                                onClick={() => { this.setState({ checked: !this.state.checked }) }}
                                isChecked={this.state.checked}
                                checkBoxColor='#54b33d'
                            />
                        </View>
                        <View style={styles.extraItemsContainer}>
                            <Text numberOfLines={1} style={styles.extraItemsName}>
                                Topping 2</Text>
                            <Text numberOfLines={1} style={styles.extraItemsPrice}>
                                + $7.95</Text>
                            <CheckBox
                                style={styles.checkbox}
                                onClick={() => { this.setState({ checked: !this.state.checked }) }}
                                isChecked={this.state.checked}
                                checkBoxColor='#54b33d'
                            />
                        </View>
                        <View style={styles.extraItemsContainer}>
                            <Text numberOfLines={1} style={styles.extraItemsName}>
                                Topping 3</Text>
                            <Text numberOfLines={1} style={styles.extraItemsPrice}>
                                + $8.95</Text>
                            <CheckBox
                                style={styles.checkbox}
                                onClick={() => { this.setState({ checked: !this.state.checked }) }}
                                isChecked={this.state.checked}
                                checkBoxColor='#54b33d'
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.extraContainer}>
                    <View style={styles.extraHeaderContainer}>
                        <Text style={styles.specialRequestHeaderTxt}>
                            <FontAwesome5 name={'sticky-note'} size={13} color={'#EBEBEB'} solid />
                            <Text> </Text>
                            Special Requests</Text>
                    </View>
                    <View style={styles.specialRequestInputContainer}>
                        <TextInput
                            style={styles.specialRequestInputText}
                            multiline={true}
                            placeholder="eg. extra limes, extra chilis, etc."
                            onChangeText={() => { }} />
                    </View>
                </View>

                <View style={styles.numericInputContainer}>
                    <NumericInput
                        // value={this.state.value}
                        // onChange={value => this.setState({ value })}
                        onChange={() => { }}
                        inputStyle={styles.numericInput}
                        totalWidth={180}
                        totalHeight={40}
                        step={1}
                        valueType='integer'
                        initValue={1}
                        minValue={1}
                        maxValue={50}
                        rounded
                        textColor='black'
                        iconStyle={{ color: '#EBEBEB' }}
                        rightButtonBackgroundColor='#54b33d'
                        leftButtonBackgroundColor='#54b33d' />
                </View>

            </ScrollView>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#EBEBEB',
    },
    foodImg: {
        flex: 0,
        backgroundColor: 'rgba(0, 0, 0, .6)',
        height: 150,
        width: null,
        margin: null,
        // resizeMode: 'contain',
    },
    miniHeader: {
        flex: 0,
        flexDirection: 'row',
        backgroundColor: 'white',
        // height: 60,
        width: null,
        // justifyContent: 'center',
        alignItems: 'center',
    },
    foodName: {
        flex: 2,
        fontSize: 20,
        fontFamily: 'Quicksand-Medium',
        // backgroundColor: 'lime',
        margin: 10,
        marginRight: 0,
        paddingRight: 10,
        borderRightWidth: 2,
        borderRightColor: '#54b33d',
        justifyContent: 'center',
        color: 'black'
    },
    foodPrice: {
        flex: 1,
        fontSize: 20,
        fontFamily: 'Quicksand-Bold',
        // backgroundColor: '#EBEBEB',
        margin: 10,
        marginLeft: 0,
        // paddingLeft: 10,
        // borderLeftWidth: 1,
        // borderLeftColor: 'rgba(84, 179, 61, .2)',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#54b33d',
    },
    descriptionContainer: {
        width: null,
        backgroundColor: 'brown',
        margin: 3,
        marginBottom: 0,
    },
    descriptionTxt: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        justifyContent: 'center',
        fontSize: 15,
        fontFamily: 'Quicksand-Medium',
        color: '#757575',
    },
    extraContainer: {
        width: null,
        backgroundColor: 'white',
        margin: 3,
        marginBottom: 0,
    },
    extraHeaderContainer: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    extraHeaderTxt: {
        flex: 2,
        backgroundColor: '#54b33d',
        color: '#EBEBEB',
        padding: 3,
        paddingLeft: 20,
        paddingRight: 10,
        fontSize: 15,
        fontFamily: 'Quicksand-Medium',
        justifyContent: 'center',
    },
    extraInfoTxt: {
        flex: 1,
        backgroundColor: 'white',
        color: '#54b33d',
        padding: 3,
        paddingRight: 10,
        paddingLeft: 10,
        fontSize: 13,
        fontFamily: 'Quicksand-Regular',
        textAlign: 'right',
        borderBottomWidth: 1,
        borderBottomColor: '#54b33d',
        borderRightWidth: 1,
        borderRightColor: '#54b33d',
        // borderLeftWidth: 1,
        // borderLeftColor: 'gray',
        justifyContent: 'center',
    },
    extraItemsContainer: {
        flex: 0,
        flexDirection: 'row',
        width: null,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: .7,
        borderBottomColor: '#54b33d',
    },
    extraItemsName: {
        flex: 4,
        // backgroundColor: 'gray',
        fontFamily: 'Quicksand-Medium',
        fontSize: 15,
        color: 'black',
        padding: 3,
        paddingRight: 5,
    },
    extraItemsPrice: {
        flex: 1,
        // backgroundColor: 'lime',
        fontFamily: 'Quicksand-Medium',
        fontSize: 15,
        color: '#757575',
        padding: 3,
        paddingLeft: 5,
        textAlign: 'right',
    },
    checkbox: {
        flex: 1,
        // backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    radioBtn: {
        flex: 1,
        paddingRight: 3,
        // backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    specialRequestHeaderTxt: {
        flex: 1,
        backgroundColor: '#54b33d',
        color: '#EBEBEB',
        padding: 3,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 15,
        fontFamily: 'Quicksand-Medium',
        justifyContent: 'center',
        textAlign: 'center',
    },
    specialRequestInputContainer: {
        flex: 0,
        width: null,
        padding: 5,
        paddingLeft: 2,
        justifyContent: 'center',
        alignItems: 'stretch',
        borderBottomWidth: 1,
        borderBottomColor: '#54b33d',
        borderLeftWidth: 1,
        borderLeftColor: '#54b33d',
        borderRightWidth: 1,
        borderRightColor: '#54b33d',
        backgroundColor: 'white',
    },
    specialRequestInputText: {
        flex: 1,
        // backgroundColor: 'purple',
        justifyContent: 'center',
        width: null,
        textAlign: 'left',
        fontFamily: 'Quicksand-Medium',
        fontSize: 18,
        color: 'black',
        padding: 5,
        paddingLeft: 10,
        borderLeftWidth: .6,
        borderLeftColor: '#54b33d',
    },
    numericInputContainer: {
        flex: 0,
        width: null,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    numericInput: {
        fontFamily: 'Quicksand-Medium',
        backgroundColor: 'white',
    },
    addFood: {
        position: 'absolute',
        left: 0,
        top: 100,
        backgroundColor: 'yellow',
    },
});