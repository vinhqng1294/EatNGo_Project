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
    Dimensions,
    PixelRatio,
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CheckBox from 'react-native-check-box';
// import { CheckBox } from 'react-native-elements'
import NumericInput from 'react-native-numeric-input';
import { fetchFoodInfo, updateFoodQuantity, updateCartItems, updateFoodOption, updateFoodSpecialRequest } from '../../actions/index'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class FoodDetailScreen extends Component {

    state = {
        checked: [],
        isUpdating: false,
        updateItemQuantity: null
    }
    constructor() {
        super();
    }

    static navigationOptions = ({ navigation }) => {
        return {
            header: null
        };
    };
    handleRadioButton(optionIndex, index) {
        this.props.updateFoodOption(optionIndex, index)
        // const { checked } = this.state
        // if (!checked.includes(item)) {
        //     console.log('check')
        //     this.setState({ checked: [...checked, item] })
        // } else {
        //     console.log('uncheck')
        //     this.setState({ checked: checked.filter(a => a.param !== item.param) });
        // }

    }

    hasAttributes(food) {
        return food.attributes && food.attributes.length > 0
    }
    renderOption(option, optionIndex) {
        if (option.compulsory) {
            return (
                <FlatList
                    data={option.options}
                    extraData={this.props}
                    renderItem={({ item, index }) =>
                        <View style={styles.extraItemsContainer}>
                            <Text numberOfLines={1} style={styles.extraItemsName}>
                                {item.name}
                            </Text>
                            <Text numberOfLines={1} style={styles.extraItemsPrice}>
                                + $ {item.price} </Text>
                            <CheckBox
                                style={styles.radioBtn}
                                onClick={() => {
                                    this.handleRadioButton(optionIndex, index)
                                }}
                                isChecked={item.isChecked}
                                checkBoxColor='#54b33d'
                                checkedImage={<FontAwesome5 name={'dot-circle'} size={18} color={'#54b33d'} solid />}
                                unCheckedImage={<FontAwesome5 name={'circle'} size={18} color={'#54b33d'}
                                />}
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
                                isChecked={item.isCheck}
                                checkBoxColor='#54b33d'
                            />
                        </View>
                    }
                />
            )
        }
    }

    renderCompulsoryIcon(item) {
        if (item.compulsory) {
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
        const { navigation } = this.props;
        const isUpdating = navigation.getParam('isUpdating', false);
        let foodId
        if (isUpdating) {
            const item = navigation.getParam('item', null);
            foodId = item.id
            this.setState({ isUpdating, updateItemQuantity: item.quantity })
            this.props.fetchFoodInfo(foodId, item.quantity);
        } else {
            foodId = navigation.getParam('id', null);
            this.props.fetchFoodInfo(foodId);
        }
    }
    render() {

        let { food } = this.props
        if (food) {
            return (
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0)' }}>
                    <StatusBar backgroundColor="#54b33d" barStyle="light-content" />
                    <TouchableOpacity style={styles.closeBtn}
                        onPress={() => { this.props.navigation.navigate('Menu') }}>
                        <FontAwesome5 name={'times'} size={16} color={'#54b33d'} solid />
                    </TouchableOpacity>
                    <ScrollView style={styles.container}>
                        {/* <ActionButton
                    buttonColor={'#54b33d'}
                    icon={<FontAwesome5 name={'plus'} size={20} color={'#EBEBEB'} solid />}
                /> */}

                        <Image style={food.images.length ? styles.foodImg : styles.foodNoImg}
                            source={food.images.length ? { uri: food.images[0].image } : require('../../Assets/resDefault_0.png')} />
                        {/* <Image style={styles.foodImg}
                            source={{ uri: food.images[0].image }} /> */}
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
                            data={food.attributes}
                            extraData={this.props}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, index }) =>
                                <View style={styles.extraContainer}>
                                    <View style={styles.extraHeaderContainer}>
                                        <Text style={styles.extraHeaderTxt}>
                                            {item.name}</Text>

                                        {this.renderCompulsoryIcon(item)}
                                        {/* Recommend</Text> */}
                                        {/* Optional</Text> */}

                                    </View>
                                    <View style={styles.extraItemContainer}>
                                        {this.renderOption(item, index)}
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
                                    onChangeText={(text) => { this.props.updateFoodSpecialRequest(text) }} />
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
                                leftButtonBackgroundColor='#54b33d'
                                editable={false} />
                        </View>

                    </ScrollView>
                    <TouchableOpacity style={styles.addFoodBtn}
                        onPress={() => {                            
                            this.props.updateCartItems(food, this.state.isUpdating)
                            this.props.navigation.state.params.onGoBack();
                            this.props.navigation.goBack()
                        }}>
                        <FontAwesome5 name={'cart-plus'} size={16} color={'white'} solid />
                        <Text style={styles.txtAdd}>{!this.state.isUpdating ? 'Add' : 'Update'}</Text>
                    </TouchableOpacity>
                </View>
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
        backgroundColor: '#EBEBEB',
        height: 150,
        width: null,
        margin: null,
        resizeMode: 'cover',
    },
    foodNoImg: {
        flex: 0,
        backgroundColor: '#EBEBEB',
        height: 150,
        width: null,
        margin: null,
        resizeMode: 'contain',
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
        marginBottom: 60,
    },
    numericInput: {
        fontFamily: 'Quicksand-Medium',
        backgroundColor: 'white',
    },
    closeBtn: {
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        left: 10,
        top: 10,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        zIndex: 100,
        width: 25,
        height: 25,
        borderRadius: 25 / 2,
        justifyContent: 'center',
        alignItems: 'center',
        textAlignVertical: 'center',
        borderWidth: 1,
        borderColor: '#54b33d',
    },
    addFoodBtn: {
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
        borderWidth: 1,
        borderColor: 'white',
    },
    txtAdd: {
        marginLeft: 5,
        marginBottom: 3,
        fontFamily: 'Quicksand-Bold',
        fontSize: 18,
        color: 'white',
        textAlignVertical: 'center',
        // backgroundColor: 'black',
        padding: 0,
    },
});

const mapStateToProps = (state) => {
    console.log(state)
    return {
        food: state.foodReducer.foodInfo,
        cart: state.cartReducer.cart
    }
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        fetchFoodInfo,
        updateFoodQuantity,
        updateCartItems,
        updateFoodOption,
        updateFoodSpecialRequest
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(FoodDetailScreen);