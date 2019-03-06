'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';

type Props = {};
export default class WelcomeScreen extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logoTitleContainer}>
                    <Image source={require('../assets/eatngo_logo_trans.png')}
                        style={styles.logoImg} />
                </View>

                <View style={styles.loginOptionContainer}>
                    <Text style={styles.normalText}>
                        Sign in using
                    </Text>
                    <TouchableOpacity style={styles.option}>
                        {/* onPress = () => {}; */}
                        <Image source={require('../assets/facebook.png')}
                            style={styles.img} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.option}>
                        {/* onPress = () => {}; */}
                        <Image source={require('../assets/google.png')}
                            style={styles.img} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.option}>
                        {/* onPress = () => {}; */}
                        <Image source={require('../assets/mobile.png')}
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