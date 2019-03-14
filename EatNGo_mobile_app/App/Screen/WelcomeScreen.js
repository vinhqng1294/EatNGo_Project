'use strict';

import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    StatusBar,
} from 'react-native';

import RNAccountKit, {
    LoginButton,
    Color,
    StatusBarStyle,
} from 'react-native-facebook-account-kit';
import { RotationGestureHandler } from 'react-native-gesture-handler';

export default class WelcomeScreen extends Component {
    state = {
        authToken: null,
        loggedAccount: null
    };

    componentDidMount() {
        this.configureAccountKit();
    }

    configureAccountKit() {
        RNAccountKit.configure({
            theme: {
            },
            defaultCountry: "VN",
            initialEmail: "example.com",
            initialPhoneCountryPrefix: "+84",
        });
    }
    handlePhoneLoginButton = async () => {
        try {
            const payload = await RNAccountKit.loginWithPhone()
            if (!payload) {
                console.warn('Login cancelled', payload)
            } else {
                console.log(payload)
                this.props.navigation.navigate('Register')
            }
        } catch (error) {
            console.warn('Error', error.message)
        }
    }


    onLoginError(e) {
        console.log("Failed to login", e);
    }
    render() {
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
                    <TouchableOpacity style={styles.option}
                        type="phone"
                        onPress={this.handlePhoneLoginButton}
                    >
                        {/* onPress = () => {}; */}
                        <Image source={require('../../Assets/mobile.png')}
                            style={styles.img} />
                    </TouchableOpacity>
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