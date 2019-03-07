'use strict';

import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';
import AccountKit, {
    LoginButton,
    Color,
    StatusBarStyle,
} from 'react-native-facebook-account-kit'
type Props = {};
export default class WelcomeScreen extends Component<Props> {
    state = {
        authToken: null,
        loggedAccount: null
    };

    componentWillMount() {
        this.configureAccountKit();

        AccountKit.getCurrentAccessToken()
            .then(token => {
                if (token) {
                    AccountKit.getCurrentAccount().then(account => {
                        this.setState({
                            authToken: token,
                            loggedAccount: account
                        });
                    });
                } else {
                    console.log("No user account logged");
                }
            })
            .catch(e => console.log("Failed to get current access token", e));
    }

    configureAccountKit() {
        AccountKit.configure({
            theme: {
            },
            defaultCountry: "VN",
            initialEmail: "example.com",
            initialPhoneCountryPrefix: "+84"

        });
    }

    onLogin(token) {
        if (!token) {
            console.warn("User canceled login");
            this.setState({});
        } else {
            AccountKit.getCurrentAccount().then(account => {
                console.log(account)
                this.setState({
                    authToken: token,
                    loggedAccount: account
                });
                this.props.navigation.navigate('ConfirmRegister')
            });
        }
    }

    onLoginError(e) {
        console.log("Failed to login", e);
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logoTitleContainer}>
                    <Image source={require('../Assets/eatngo_logo_trans.png')}
                        style={styles.logoImg} />
                </View>

                <View style={styles.loginOptionContainer}>
                    <Text style={styles.normalText}>
                        Sign in using
                    </Text>
                    <TouchableOpacity style={styles.option}>
                        {/* onPress = () => {}; */}
                        <Image source={require('../Assets/facebook.png')}
                            style={styles.img} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.option}>
                        {/* onPress = () => {}; */}
                        <Image source={require('../Assets/google.png')}
                            style={styles.img} />
                    </TouchableOpacity>
                    <LoginButton style={styles.option}
                        type="phone"
                        onLogin={(token) => this.onLogin(token)} onError={(e) => this.onLogin(e)}>
                        {/* onPress = () => {}; */}
                        <Image source={require('../Assets/mobile.png')}
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
        fontFamily: 'Quicksand',
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