'use strict';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { authLogin } from '../../actions/index'
import { connect } from 'react-redux';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    StatusBar,
} from 'react-native';

import AccountKit, {
    LoginButton,
    Color,
    StatusBarStyle,
} from 'react-native-facebook-account-kit';
import { RotationGestureHandler } from 'react-native-gesture-handler';
class WelcomeScreen extends Component {
    state = {
        phoneNumber: null,
        facebookId: null,
    };

    componentWillMount() {
        this.configureAccountKit();
    }
    // componentDidMount() {

    // }
    configureAccountKit() {
        AccountKit.configure({
            theme: {
            },
            defaultCountry: "VN",
            initialEmail: "example.com",
            initialPhoneCountryPrefix: "+84",
        });
    }
    // handlePhoneLoginButton = async () => {
    //     try {
    //         const payload = await RNAccountKit.loginWithPhone()
    //         if (!payload) {
    //             console.warn('Login cancelled', payload)
    //         } else {
    //             console.log(payload)
    //             this.props.navigation.navigate('Register')
    //         }
    //     } catch (error) {
    //         console.warn('Error', error.message)
    //     }
    // }
    onLogin(token) {
        if (!token) {
            console.warn("User canceled login");
            this.setState({});
        } else {
            AccountKit.getCurrentAccount().then(account => {
                console.log(account)
                const phoneNumber = this.getPhoneNumber(account.phoneNumber.number)
                this.setState({ phoneNumber, facebookId: account.id })
                this.props.authLogin(phoneNumber, account.id)
                // this.props.navigation.navigate('Register')
            });
        }
    }
    getPhoneNumber(phoneNumber) {
        if (phoneNumber.length < 10) {
            return '0'.concat(phoneNumber)
        }
        return phoneNumber
    }
    onLoginError(e) {
        console.log("Failed to login", e);
    }
    render() {
        const { loginError, user } = this.props
        if (loginError) {
            console.log(this.state.phoneNumber)
            this.props.navigation.navigate('Register', { phoneNumber: this.state.phoneNumber, facebookId: this.state.facebookId })
        }
        if (user) {
            this.props.navigation.navigate('Home')
        }
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#EBEBEB" barStyle="dark-content" />
                <View style={styles.logoTitleContainer}>
                    <Image source={require('../../Assets/eatngo_logo_trans.png')}
                        style={styles.logoImg} />
                </View>

                <View style={styles.loginOptionContainer}>
                    <Text style={styles.normalText}>
                        Sign in using
                    </Text>
                    <TouchableOpacity style={styles.option}>
                        {/* onPress = () => {}; */}
                        <Image source={require('../../Assets/facebook.png')}
                            style={styles.img} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.option}
                        onPress={() => {
                            this.props.navigation.navigate('Register')
                        }}>
                        <Image source={require('../../Assets/google.png')}
                            style={styles.img} />
                    </TouchableOpacity>
                    <LoginButton style={styles.option}
                        type="phone"
                        onLogin={(token) => this.onLogin(token)} onError={(e) => this.onLogin(e)}>
                        {/* onPress = () => {}; */}
                        <Image source={require('../../Assets/mobile.png')}
                            style={styles.img} />
                    </LoginButton>
                </View>

                <View style={styles.footer}>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: '#EBEBEB',
    },
    logoTitleContainer: {
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#EBEBEB',
    },
    loginOptionContainer: {
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#EBEBEB',
        alignItems: 'center',
    },
    logoImg: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain',
    },
    normalText: {
        textAlign: 'center',
        fontSize: 18,
        color: '#878787',
        fontFamily: 'Quicksand-Medium',
    },
    option: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EBEBEB',
        width: 110,
    },
    img: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    footer: {
        flex: .5,
        backgroundColor: '#EBEBEB',
    },
});
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        authLogin,
    }, dispatch);
}
const mapStateToProps = (state) => {
    console.log(state)
    return {
        user: state.authReducer.user,
        loginError: state.authReducer.loginError
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);
