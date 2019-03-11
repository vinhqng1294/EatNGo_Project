import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    FlatList,
    Image,
    Text,
} from 'react-native';

type Props = {};
export default class ActiveOrderScreen extends Component<Props> {
    render() {
        return (
            <View>
                <Text style={styles.normalText}>Active Order Screen</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    normalText: {
        fontSize: 18,
        fontFamily: 'Quicksand',
    }
});