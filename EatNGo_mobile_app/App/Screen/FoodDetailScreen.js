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
import { fetchFood, updateFoodQuantity } from '../../actions/index'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ActionButton from 'react-native-action-button';

class FoodDetailScreen extends Component {
    constructor() {
        super();
        this.state = {
            value: 1
        };
    }

    handleRadioButton(item, option) {
        console.log(item)
        item.isChecked = true
        console.log(option)
    }
    renderOption(option) {
        if (option.isCompulsory) {
            return (
                <FlatList
                    data={option.items}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) =>
                        <View style={styles.extraItemsContainer}>
                            <Text numberOfLines={1} style={styles.extraItemsName}>
                                {item.name}
                            </Text>
                            <Text numberOfLines={1} style={styles.extraItemsPrice}>
                                + $ {item.price} </Text>
                            <CheckBox
                                style={styles.radioBtn}
                                onClick={() => {
                                    this.handleRadioButton(item, option)
                                }}
                                isChecked={item.isChecked}
                                checkBoxColor='#54b33d'
                                checkedImage={<FontAwesome5 name={'dot-circle'} size={18} color={'#54b33d'} solid />}
                                unCheckedImage={<FontAwesome5 name={'circle'} size={18} color={'#54b33d'} />}
                            />
                        </View>
                    }
                />
            )
        } else {
            return (
                <FlatList
                    data={option.items}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) =>
                        <View style={styles.extraItemsContainer}>
                            <Text numberOfLines={1} style={styles.extraItemsName}>
                                {item.name}
                            </Text>
                            <Text numberOfLines={1} style={styles.extraItemsPrice}>
                                + $ {item.price}</Text>
                            <CheckBox
                                style={styles.checkbox}
                                onClick={() => { }}
                                isChecked={item.isChecked}
                                checkBoxColor='#54b33d'
                            />
                        </View>
                    }
                />
            )
        }
    }

    renderCompulsoryIcon(item) {
        if (item.isCompulsory) {
            return (
                <Text style={styles.extraInfoTxt}>
                    <FontAwesome5 name={'exclamation-circle'} size={13} color={'#54b33d'} solid />
                    {/* <FontAwesome5 name={'thumbs-up'} size={13} color={'#54b33d'} solid /> */}
                    {/* <FontAwesome5 name={'check'} size={13} color={'#54b33d'} solid /> */}
                    <Text> </Text>
                    Compulsory</Text>
            )
        }
        return null;
    }

    componentDidMount() {
        this.props.fetchFood(1);
    }
    render() {
        let { food } = this.props
        if (food) {
            return (
                <ScrollView style={styles.container}>
                    <StatusBar backgroundColor="#54b33d" barStyle="light-content" />
                    {/* <ActionButton
                    buttonColor={'#54b33d'}
                    icon={<FontAwesome5 name={'plus'} size={20} color={'#EBEBEB'} solid />}
                /> */}

                    <Image style={styles.foodImg}
                        source={food.imgURL} />
                    <View style={styles.miniHeader}>
                        <Text numberOfLines={2} style={styles.foodName}>{food.name}</Text>
                        <Text numberOfLines={1} style={styles.foodPrice}>$ {food.price}</Text>
                    </View>
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.descriptionTxt}>
                            {food.description}
                        </Text>
                    </View>
                    <FlatList
                        data={food.extraOptions}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) =>
                            <View style={styles.extraContainer}>
                                <View style={styles.extraHeaderContainer}>
                                    <Text style={styles.extraHeaderTxt}>
                                        {item.categoryName}</Text>

                                    {this.renderCompulsoryIcon(item)}
                                    {/* Recommend</Text> */}
                                    {/* Optional</Text> */}

                                </View>
                                <View style={styles.extraItemContainer}>
                                    {this.renderOption(item)}
                                </View>
                            </View>

                        }
                    />

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
                            // onChange={value => this.setState({ value })}                            
                            onChange={(value) => {
                                this.props.updateFoodQuantity(value)
                            }}
                            inputStyle={styles.numericInput}
                            totalWidth={180}
                            totalHeight={40}
                            step={1}
                            valueType='integer'
                            initValue={food.quantity}
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
        return null
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
    }
});

const mapStateToProps = (state) => {
    console.log(state)
    return {
        food: state.foodReducer.food
    }
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        fetchFood,
        updateFoodQuantity
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(FoodDetailScreen);