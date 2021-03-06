import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Text,
  ScrollView,
} from 'react-native';

const StoreItem = ({ store, onPress }) => (
  <ImageBackground
    style={styles.row}
    source={store.image ? { uri: store.image } : require('../../Assets/resDefault_1.png')}
    imageStyle={store.image ? { resizeMode: 'cover' } : { resizeMode: 'contain' }}
  >
    <View style={store.image ? styles.rowContent : styles.rowContentNoImage}>
      <View style={styles.restaurantNameContainer}>
        <Text numberOfLines={1} style={styles.restaurantName}>
          {store.name}
        </Text>
      </View>
      <View style={styles.miniDetailsContainer}>
        <View style={styles.distance}>
          <Text numberOfLines={1} style={styles.distanceTxt}>
            {store.phone}
          </Text>
          <Text numberOfLines={1} style={styles.streetName}>
            {store.address}
          </Text>
          {/* <Text style={styles.remainingSeat}>
                                5
                            </Text> */}
        </View>
        {/* <TouchableOpacity style={styles.button}>
                                <Text style={styles.btnText}>Take-away</Text>
                            </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.button}
          onPress={onPress}
        >
          <Text style={styles.btnText}>Dine-in</Text>
        </TouchableOpacity>
      </View>
    </View>
  </ImageBackground>
);

const styles = StyleSheet.create({
  row: {
    flex: 0,
    backgroundColor: 'rgba(0, 0, 0, .6)',
    height: 110,
    width: null,
    margin: 5,
    // resizeMode: 'contain',
  },
  rowContentNoImage: {
    backgroundColor: 'rgba(84, 179, 61, .27)',
    flex: 0,
    height: 110,
    width: null,
  },
  rowContent: {
    backgroundColor: 'rgba(0, 0, 0, .6)',
    flex: 0,
    height: 110,
    width: null,
  },
  normalText: {
    fontSize: 18,
    fontFamily: 'Quicksand-Regular',
  },
  restaurantNameContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, .0)',
  },
  restaurantName: {
    textAlign: 'center',
    fontFamily: 'Quicksand-Medium',
    fontSize: 22,
    color: '#EBEBEB',
    padding: 3,
    width: null,
    height: null,
  },
  miniDetailsContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(84, 179, 61, .2)',
    marginTop: 10,
    marginBottom: 10,
  },
  distance: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'flex-start',
    // backgroundColor: 'gray',
  },
  distanceTxt: {
    textAlign: 'center',
    fontFamily: 'Quicksand-Medium',
    fontSize: 15,
    color: '#EBEBEB',
    // backgroundColor: 'green',
    marginLeft: 10,
  },
  streetName: {
    textAlign: 'left',
    fontFamily: 'Quicksand-Regular',
    fontSize: 15,
    color: '#EBEBEB',
    // backgroundColor: 'green',
    marginLeft: 10,
    // width: 190,
    maxWidth: 190,
  },
  button: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  btnText: {
    backgroundColor: '#54b33d',
    padding: 5,
    color: '#EBEBEB',
    fontFamily: 'Quicksand-Bold',
    fontSize: 15,
    borderWidth: 0,
  },
});
export default StoreItem;
