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
            <ScrollView style={styles.container}>
                <StatusBar backgroundColor="#54b33d" barStyle="light-content" />
                <View style={styles.menuSetContainer}>
                    <View style={styles.menuSetHeaderContainer}>
                        <Text style={styles.menuSetTitle}>
                            Menu #1</Text>
                    </View>
                    <View style={styles.menuSetItem}>
                        <Image style source={require('../../Assets/resA.jpg')} />
                        <View style={styles.itemDetail}>
                            <Text>food name</Text>
                            <Text>food price</Text>
                            <Text>preparation time</Text>
                        </View>
                    </View>
                    <CheckBox onClick={()=>{}}/>
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
    menuSetContainer: {
        // backgroundColor: 'yellow',
        flex: 1,
        flexDirection: 'column',
        width: null,
    },
    menuSetHeaderContainer: {
        backgroundColor: 'yellow',
        flex: 1,
        width: null,
    },
    menuSetTitle: {
        backgroundColor: 'purple',
        fontFamily: 'Quicksand-Bold',
        fontSize: 17,
        textAlign: 'center',
        justifyContent: 'center',
        paddingTop: 5,
        paddingBottom: 5,
    },


});