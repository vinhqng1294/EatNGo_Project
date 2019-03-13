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
} from 'react-native';

import CheckBox from 'react-native-check-box';

export default class MenuScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#54b33d" barStyle="light-content" />
                <ImageBackground style={styles.miniHeader}
                    source={require('../../Assets/resC.jpg')}>
                    <View style={styles.miniHeader}>
                        
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#EBEBEB',
    },
    miniHeader: {
        flex: 0,
        backgroundColor: 'rgba(0, 0, 0, .6)',
        height: 110,
        width: null,
        margin: null,
        // resizeMode: 'contain',
    },

    // checkbox: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // }


});