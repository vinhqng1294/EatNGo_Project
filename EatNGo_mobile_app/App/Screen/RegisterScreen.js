import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { AsyncStorage } from 'react-native';
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
    storeUserInfo = async () => {
        try {
            await AsyncStorage.setItem('token', 'test');
        } catch (error) {
            console.log(error)
        }
    }
    handleSignUp() {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Home' })],
        });
        this.props.navigation.dispatch(resetAction);
        // const { name, email } = this.state;
        // this.props.authRegister(email, "123456")

    }
    // shouldComponentUpdate(nextProps, nextState){
    //     if(this.props.registerMessage != this.nextProps.registerMessage){
    //         this.props.navigation.navigate('Home')
    //     }
    //     return
    // }
    render() {
        const { registerMessage } = this.props
        if (registerMessage && registerMessage.success) {
            // this.storeUserInfo()            
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Home' })],
            });
            this.props.navigation.dispatch(resetAction);
        }
        return (
            <View style={styles.container} >
                <Text style={styles.question}>How should we contact you?</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Please enter your name"
                    onChangeText={(text) => this.setState({ name: text })}
                    value={this.state.name}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Please enter your email"
                    onChangeText={(text) => this.setState({ email: text })}
                    value={this.state.email}
                />
                <TouchableOpacity style={styles.submitButton}
                    onPress={() => {
                        if (this.state.name.length == 0) {
                            Alert.alert("Alert", 'You must enter name');
                            return;
                        } else if (this.state.email.length == 0) {
                            Alert.alert('Alert', "You must enter email");
                            return
                        }
                        else {
                            this.handleSignUp()
                        }
                    }}>
                    <Text style={styles.submitButtonText}>FINISH</Text>

                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        marginBottom: 10,
    },
    question: {
        fontFamily: 'Quicksand-Bold',
        color: 'black',
        fontSize: 20,
    },
    input: {
        height: 50,
        fontSize: 18,
        fontFamily: 'Quicksand-Regular',
        borderColor: '#EBEBEB',
        borderBottomWidth: 1,
    },
    submitButton: {
        marginTop: 15,
        backgroundColor: '#54b33d',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitButtonText: {
        // backgroundColor: 'black',
        textAlign: 'center',
        justifyContent: 'center',
        color: '#EBEBEB',
        fontFamily: 'Quicksand-Bold',
        fontSize: 18,
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