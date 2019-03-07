import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    FlatList,
    ImageBackground,
    Text,
} from 'react-native';

type Props = {};
export default class HomeScreen extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <View style={restaurantName}>
                    
                    </View>
                </View>
                <View style={styles.row}>

                </View>
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
    row: {
        flex: 0,
        backgroundColor: 'purple',
        height: 100,
        width: null,
        marginLeft: 10,
        marginTop: 5,
        marginRight: 10,
        marginBottom: 5,
    },
    normalText: {
        fontSize: 18,
        fontFamily: 'Quicksand',
    }
});