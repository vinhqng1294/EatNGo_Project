import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    FlatList,
    ImageBackground,
    Text,
    ScrollView,
} from 'react-native';

type Props = {};
export default class MenuScreen extends Component<Props> {
    render() {
        return (
            <ScrollView style={styles.container}>

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#EBEBEB',
    }
});