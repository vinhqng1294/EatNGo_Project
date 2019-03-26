import React, { Component } from "react";
import { Text, View, TextInput, StyleSheet, Alert } from "react-native";
import { Avatar, Button, Badge, Divider } from "react-native-elements";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateUserProfile } from "../../actions/index";
import { validateEmail } from "../../utils/index";

class EditProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: ""
    };
  }
  componentDidMount() {
    this.setState({
      name: this.props.user.name,
      email: this.props.user.email
    });
  }

  static navigationOptions = ({ navigation }) => {
    return {
        headerTintColor: '#54b33d',
        headerStyle: { backgroundColor: 'white' },
        headerRight: <View></View>,
        headerLeft: <View></View>,
        headerTitle:
            <View style={{
                justifyContent: 'center',
                alignItems: 'stretch',
                flex: 1,
            }}>
                <Text numberOfLines={1} style={{
                    fontFamily: 'Quicksand-Medium',
                    fontSize: 20,
                    textAlign: 'center',
                    color: '#54b33d',
                    marginLeft: 50,
                    marginRight: 50,
                    borderBottomWidth: .7,
                    borderBottomColor: '#54b33d',
                }} >Edit Profile</Text>
            </View>
    };
};

  changeInfo() {}

  render() {
    const { user } = this.props;
    return (
      <View style={{ paddingTop: 20, paddingLeft: 20 }}>
        <Text style={{ fontWeight: "bold" }}>USER NAME</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Please enter your name..."
          underlineColorAndroid={"transparent"}
          value={this.state.name}
          onChangeText={text => this.setState({ name: text })}
        />

        <Text style={{ fontWeight: "bold" }}>EMAIL</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Please enter your email..."
          underlineColorAndroid={"transparent"}
          value={this.state.email}
          onChangeText={text => this.setState({ email: text })}
        />

        <Text style={{ fontWeight: "bold" }}>PHONE</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Please enter your phone..."
          underlineColorAndroid={"transparent"}
          value={user.phoneNumber}
          editable={false}
        />

        <Button
          buttonStyle={styles.changeButton}
          onPress={() => {
            if (this.state.name.length == 0) {
              Alert.alert("Alert", "You must enter name");
              return;
            } else if (
              this.state.email.length == 0
            )  {
              Alert.alert("Alert", "You must enter email");
              return;
            } else if (!validateEmail(this.state.email)) {
              Alert.alert("Alert", "Invalid email");
              return;
            }
            else {
              this.props.updateUserProfile(
                this.state.email,
                this.state.name,
                user.id
              );
              this.props.navigation.goBack();
            }
          }}
          title="Apply Change"
          color="#841584"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    alignSelf: "stretch",
    height: 40,
    marginBottom: 30,
    color: "black",
    borderBottomColor: "#f8f8f8",
    borderBottomWidth: 1
  },
  changeButton: {
    marginRight: 20,
    backgroundColor: "#54C242",
    height: 50,
    fontSize: 18,
    fontFamily: "Quicksand-Regular",
    borderColor: "#EBEBEB",
    borderBottomWidth: 1
  }
});

const mapStateToProps = state => {
  return {
    user: state.authReducer.user
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ updateUserProfile }, dispatch);
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfileScreen);
