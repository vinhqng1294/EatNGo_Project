import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  ToastAndroid,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Platform
} from "react-native";
import * as firebase from "firebase";

import { ListItem, Button, Icon } from "react-native-elements";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { authLogout, uploadAvatar } from "../../actions/index";
import { StackActions, NavigationActions } from "react-navigation";
import ImagePicker from "react-native-image-picker";
import RNFetchBlob from "react-native-fetch-blob";


// import firebaseApp from "../Components/FirebaseConfig";

var config = {
  apiKey: "AIzaSyAi_Bo_JGPLsEsPuSrhcoGzl854orNO9gw",
  authDomain: "eatngo-a7c8f.firebaseapp.com",
  databaseURL: "https://eatngo-a7c8f.firebaseio.com",
  projectId: "eatngo-a7c8f",
  storageBucket: "eatngo-a7c8f.appspot.com",
  messagingSenderId: "449555065359"
};

const firebaseApp = firebase.initializeApp(config);
export const NO_USER = require('../../Assets/eatngo_logo_trans.png'); 

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.renderOptions = this.renderOptions.bind(this);
    this.state = {
      avatarSource: null
    };
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
                }} >Profile</Text>
            </View>
    };
};

  pickImage() {
    const { user } = this.props;
    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);

      // this.setState({ avatarSource: "" });
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        // const source = { uri: response.uri };
        // console.log("URI: ", source);

        // // You can also display the image using data:
        // // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        // set state for avatar
        // this.setState({
        //   avatarSource: source
        // });

        console.log("URI: " + response.uri);
        uploadImage(response.uri)
          .then(url => {
            this.setState({ avatarSource: url });
            this.props.uploadAvatar(url, user.id);
          })
          .catch(error => console.log(error));
      }
    });
  }

  renderContactHeader = () => {
    const { user } = this.props;
    return (
      <View style={styles.headerContainer}>
        <View style={styles.userRow}>
          <TouchableOpacity onPress={() => this.pickImage()}>
            <Image
              source={user.avatar ? {
                uri: this.props.user.avatar
              } : require('../../Assets/no_user.png')}
              style={styles.userImage}
            />
          </TouchableOpacity>
          <View style={styles.userNameRow}>
            <Text style={styles.userNameText}>{user.name}</Text>
          </View>
          <View style={styles.userBioRow}>
            <Text style={styles.userBioText}>{user.email}</Text>
          </View>
        </View>
        <View style={styles.socialRow}>
          <View>
            <Icon
              size={30}
              type="entypo"
              color="#3B5A98"
              name="facebook-with-circle"
              onPress={() => ToastAndroid.show("facebook", ToastAndroid.SHORT)}
            />
          </View>
          <View style={styles.socialIcon}>
            <Icon
              size={30}
              type="entypo"
              color="#56ACEE"
              name="twitter-with-circle"
              onPress={() => ToastAndroid.show("twitter", ToastAndroid.SHORT)}
            />
          </View>
          <View>
            <Icon
              size={30}
              type="entypo"
              color="#DD4C39"
              name="google--with-circle"
              onPress={() => ToastAndroid.show("google", ToastAndroid.SHORT)}
            />
          </View>
        </View>
      </View>
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  renderOptions = () => {
    return list.map((item, i) => (
      <ListItem
        renderSeparator={this.renderSeparator}
        key={i}
        title={item.title}
        leftIcon={{ name: item.icon }}
        onPress={() => this.onPressOption(item.title)}
      />
    ));
  };

  onPressOption(title) {
    switch (title) {
      case "Settings":
        this.props.navigation.navigate("EditProfile");
    }
  }

  render() {
    const { user } = this.props;
    if (user === null) {
      const resetAction = StackActions.reset({
        index: 0,
        key: null,
        actions: [NavigationActions.navigate({ routeName: "Welcome" })]
      });
      this.props.navigation.dispatch(resetAction);
      return null;
    } else {
      return (
        <ScrollView style={styles.scroll}>
          <View style={styles.container}>
            <View style={styles.cardContainer}>
              {this.renderContactHeader()}
            </View>
          </View>

          <View>{this.renderOptions()}</View>

          <Button
            title="Logout"
            buttonStyle={styles.logoutButton}
            onPress={() => {
              Alert.alert(
                "Confirm your action",
                "Are you sure to logout ?",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "OK", onPress: () => this.props.authLogout() }
                ],
                { cancelable: false }
              );
            }}
          />
          <View style={styles.footerInfo}>
            <Text style={styles.version}>Version 0.0.1</Text>
            <Text style={styles.version}>A ENG Corporation</Text>
          </View>
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  version: { fontFamily: "vincHand", fontSize: 13 },
  footerInfo: { flex: 1, alignItems: "center", marginTop: 20 },
  logoutButton: { backgroundColor: "#54C242", marginHorizontal: 20 },
  cardContainer: {
    flex: 1
  },
  container: {
    flex: 1
  },
  headerContainer: {
    alignItems: "center",
    backgroundColor: "#FFF",
    marginBottom: 10,
    marginTop: 45
  },
  indicatorTab: {
    backgroundColor: "transparent"
  },
  scroll: {
    backgroundColor: "#FFF"
  },
  sceneContainer: {
    marginTop: 10
  },
  socialIcon: {
    marginLeft: 14,
    marginRight: 14
  },
  socialRow: {
    flexDirection: "row"
  },
  tabBar: {
    backgroundColor: "#EEE"
  },
  tabContainer: {
    flex: 1,
    marginBottom: 12
  },
  tabLabelNumber: {
    color: "gray",
    fontSize: 12.5,
    textAlign: "center"
  },
  tabLabelText: {
    color: "black",
    fontSize: 22.5,
    fontWeight: "600",
    textAlign: "center"
  },
  userBioRow: {
    marginLeft: 40,
    marginRight: 40
  },
  userBioText: {
    color: "gray",
    fontSize: 13.5,
    textAlign: "center"
  },
  userImage: {
    borderRadius: 60,
    height: 120,
    marginBottom: 10,
    width: 120
  },
  userNameRow: {
    marginBottom: 10
  },
  userNameText: {
    color: "#5B5A5A",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  },
  userRow: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    marginBottom: 12
  }
});

const list = [
  {
    title: "History",
    icon: "history"
  },
  // {
  //   title: "Favorite",
  //   icon: "favorite"
  // },
  // {
  //   title: "Payment",
  //   icon: "payment"
  // },
  {
    title: "Settings",
    icon: "settings"
  }
];

const options = {
  title: "Select Avatar",
  customButtons: [{ name: "fb", title: "Choose Photo from Facebook" }],
  storageOptions: {
    skipBackup: true,
    path: "images"
  }
};

const storage = firebaseApp.storage();
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;

const uploadImage = (uri, mime = "application/octet-stream") => {
  return new Promise((resolve, reject) => {
    const uploadUri = Platform.OS === "ios" ? uri.replace("file://", "") : uri;
    const sessionId = new Date().getTime();
    let uploadBlob = null;
    const imageRef = storage.ref("images").child(`${sessionId}.jpg`);

    fs.readFile(uploadUri, "base64")
      .then(data => {
        return Blob.build(data, { type: `${mime};BASE64` });
      })
      .then(blob => {
        uploadBlob = blob;
        return imageRef.put(blob, { contentType: mime });
      })
      .then(() => {
        uploadBlob.close();
        return imageRef.getDownloadURL().then(url => {
          resolve(url);
        });
      })
      .catch(error => {
        reject(error);
      });
  });
};

window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

const mapStateToProps = state => {
  return {
    user: state.authReducer.user
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      authLogout,
      uploadAvatar
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileScreen);
