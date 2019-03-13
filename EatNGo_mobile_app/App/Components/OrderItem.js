import React, { Component } from 'react';
import {View,Text, StyleSheet} from 'react-native'
export default class OrderItem extends Component {
    render(){
        return (
            <View style={styles.item}>
                <Text>Acai Beach Club</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    item: {
        flex: 1
    },
    storeName:{
        fontWeight: 'bold'
    }
})