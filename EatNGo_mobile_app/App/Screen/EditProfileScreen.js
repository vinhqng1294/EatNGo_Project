import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';


export default class EditProfileScreen extends Component {



  render() {
    return (
      <View>
        <Avatar 
        containerStyle={{flex: 4, marginTop: 75}}
          source={{
            uri:
              'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
          }}
          showEditButton
        />
      </View>
    );
  }
}




