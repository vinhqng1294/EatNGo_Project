import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authRegister } from '../../actions/index'
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
} from 'react-native';
class RegisterScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: '',
            email: ''
        };
    }
    handleSignUp() {
        const { name, email } = this.state;
        this.props.authRegister(email, "123456")
    }
    render() {
        const { registerMessage } = this.props
        if (registerMessage && registerMessage.success) {
            this.props.navigation.navigate('Home')
        }
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
                    onChangeText={(text) => this.setState({ name: text })}
                    value={this.state.name}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Your Email"
                    onChangeText={(text) => this.setState({ email: text })}
                    value={this.state.email}
                />
                <TouchableOpacity style={styles.submitButton}
                    onPress={() => {
                        if (this.state.name.length == 0) {
                            alert("You must enter name ");
                            return;
                        } else if (this.state.email.length == 0) {
                            alert("You must enter email");
                        }
                        else {
                            this.handleSignUp()
                        }
                    }}>
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

const mapStateToProps = (state) => {
    console.log(state)
    return {
        registerMessage: state.authReducer.registerMessage,
    }
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        authRegister,
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);