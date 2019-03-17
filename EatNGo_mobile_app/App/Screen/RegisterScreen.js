import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { AsyncStorage } from 'react-native';
import { authRegister } from '../../actions/index'
import { validateEmail } from '../../utils/index'
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Alert,
    StatusBar
} from 'react-native';
import { Header } from 'react-native-elements';

class RegisterScreen extends Component {
    static navigationOptions = {
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#54b33d' },
        headerRight: <View></View>,
        headerTitle:
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
            }}>
                <Text style={{
                    justifyContent: 'center',
                    textAlign: 'center',
                    fontFamily: 'Quicksand-Medium',
                    fontSize: 20,
                    color: 'white',
                }}>Complete Your Registration</Text>
            </View>
    };

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
    handleSignUp(phoneNumber, email, name, authId) {
        this.props.authRegister(phoneNumber, email, name, authId)

        // const { name, email } = this.state;


    }
    // shouldComponentUpdate(nextProps, nextState){
    //     if(this.props.registerMessage != this.nextProps.registerMessage){
    //         this.props.navigation.navigate('Home')
    //     }
    //     return
    // }
    render() {
        const phoneNumber = this.props.navigation.getParam('phoneNumber', null);
        const authId = this.props.navigation.getParam('authId', null);
        const { user } = this.props
        if (user) {
            const resetAction = StackActions.reset({
                index: 0,
                key: null,
                actions: [NavigationActions.navigate({ routeName: 'Home' })],
            });
            this.props.navigation.dispatch(resetAction);
        }
        return (
            <View style={styles.container} >
                <StatusBar backgroundColor="#54b33d" barStyle="light-content" />
                <Text style={styles.question}>How should we contact you?</Text>
                <TextInput
                    style={styles.input}
                    value={phoneNumber}
                    editable={false}
                />
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
                        } else if (this.state.email.length == 0 || !validateEmail(this.state.email)) {
                            Alert.alert('Alert', "You must enter email");
                            return
                        }
                        else {
                            this.handleSignUp(phoneNumber, this.state.email, this.state.name, authId)
                        }
                    }}>
                    <Text style={styles.submitButtonText}>FINISH</Text>

                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerTitle: {
        justifyContent: 'center',
        alignItems: 'center',
    },
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
        user: state.authReducer.user,
    }
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        authRegister,
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);