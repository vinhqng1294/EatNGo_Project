import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
} from 'react-native';
export default class ConfirmRegisterScreen extends Component {
    render() {
        return (
            <View style={styles.container} >
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                    color: 'black'
                }}>How should we contact you?</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Your name"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Your Email"
                />
                <TouchableOpacity style={styles.submitButton}>
                    <Text style={{ textAlign: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>DONE</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        marginBottom: 10
    },
    input: {
        height: 50,
        fontSize: 18,
        borderColor: '#9FA6AD',
        borderBottomWidth: 1
    },
    submitButton: {
        marginTop: 15,
        backgroundColor: 'green',
        padding: 15,
        height: 50,
    },
    submitButtonText: {
        color: 'white'
    }
})