import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    FlatList,
    ImageBackground,
    Text,
    KeyboardAvoidingView,
    StatusBar,
    Image,
    Dimensions,
    Alert
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Badge, Button, Divider } from 'react-native-elements';
import { addCard } from "../../actions/index";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard'
import stripe, { PaymentCardTextField } from 'tipsi-stripe'
import Spoiler from '../Components/Spoiler'
class AddCardScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            valid: false,
            params: {
                number: '',
                expMonth: 0,
                expYear: 0,
                cvc: '',
            },
        }

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
                    }} >Add Your Card</Text>
                </View>
        };
    };
    componentDidMount() {
        stripe.setOptions({
            publishableKey: 'pk_test_ZD2lam3ahH8lrLCVqyAOSdS3',
            androidPayMode: 'test', // Android only
        })
    }
    showAlert(message) {
        Alert.alert(
            'Card Alert',
            message,
            [
                {
                    text: 'OK', onPress: () => {
                    }
                },
            ],
            { cancelable: false }
        );
    }
    handleFieldParamsChange = (valid, params) => {
        this.setState({
            valid,
            params,
        })
    }
    addCard = async () => {
        if (this.state.valid) {
            this.showAlert('Your card is invalid, please try again')
        } else {
            try {
                // console.log(this.state.params)
                const token = await stripe.createTokenWithCard({
                    number: '4242424242424242',
                    expMonth: 12,
                    expYear: 2020,
                    cvc: '123'
                })
                this.props.addCard(token)
            } catch (error) {
                console.log(error)
            }
        }
    }

    render() {
        const { params } = this.state
        const { cardData } = this.props.user
        if(cardData){
            this.props.navigation.goBack()
        }
        return (
            <View style={styles.container} >
                <PaymentCardTextField
                    style={styles.field}
                    disabled={false}
                    onParamsChange={this.handleFieldParamsChange}
                />

                <Spoiler title="Card Information" style={styles.spoiler}>
                    <View
                        style={styles.params}>
                        <Text
                            style={styles.instruction}
                        >
                            Number: {params.number || '-'}
                        </Text>
                        <Text
                            style={styles.instruction}
                        >
                            Month: {params.expMonth || '-'}
                        </Text>
                        <Text
                            style={styles.instruction}
                        >
                            Year: {params.expYear || '-'}
                        </Text>
                        <Text
                            style={styles.instruction}
                        >
                            CVC: {params.cvc || '-'}
                        </Text>
                    </View>
                </Spoiler>
                <TouchableOpacity style={styles.checkoutBtn}
                    onPress={this.addCard}>
                    {/* <View style={styles.iconWrapper}>
                        <FontAwesome5
                            style={styles.icons}
                            name={'credit-card'}
                            size={23}
                            color={'#54b33d'}
                            solid
                        />
                    </View> */}
                    <Text numberOfLines={1} style={styles.buttonTitle}>Add Card</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    field: {
        width: '100%',
        color: '#449aeb',
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 5,
    },
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
    instruction: {
        color: '#333333',
        marginBottom: 5,
        fontFamily: 'Quicksand-Bold',
        fontSize: 15,
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
        marginTop: 10
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
    spoiler: {
        width: '100%'
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
    icons: {
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});


const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            addCard
        },
        dispatch
    );
};

const mapStateToProps = state => {
    console.log(state)
    return {
        user: state.authReducer.user
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddCardScreen);

