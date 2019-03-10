import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    FlatList,
    ImageBackground,
    Text,
} from 'react-native';

type Props = {};
export default class HomeScreen extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                {/* first row */}
                <ImageBackground style={styles.row}
                    source={require('../Assets/resA.jpg')}>
                    <View style={styles.rowContent}>
                        <View style={styles.restaurantNameContainer}>
                            <Text numberOfLines={1} style={styles.restaurantName}>
                                Eat'n'Go Food Shop
                        </Text>
                        </View>
                        <View style={styles.miniDetailsContainer}>
                            <View style={styles.distance}>
                                <Text numberOfLines={1} style={styles.distanceTxt}>
                                    1.5 mi
                                </Text>
                                <Text numberOfLines={1} style={styles.streetName}>
                                    Quang Trung street
                                </Text>
                            </View>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.btnText}>Take-away</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.btnText}>Dine-in</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>

                {/* second row */}
                <ImageBackground style={styles.row}
                    source={require('../Assets/resB.jpg')}>
                    <View style={styles.rowContent}>
                        <View style={styles.restaurantNameContainer}>
                            <Text numberOfLines={1} style={styles.restaurantName}>
                                Tokyo Deli
                        </Text>
                        </View>
                        <View style={styles.miniDetailsContainer}>
                            <View style={styles.distance}>
                                <Text numberOfLines={1} style={styles.distanceTxt}>
                                    6.5 mi
                                </Text>
                                <Text numberOfLines={1} style={styles.streetName}>
                                    Hai Ba Trung street
                                </Text>
                                {/* <Text style={styles.remainingSeat}>
                                5
                            </Text> */}
                            </View>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.btnText}>Take-away</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.btnText}>Dine-in</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>

                {/* third row */}
                <ImageBackground style={styles.row}
                    source={require('../Assets/resC.jpg')}>
                    <View style={styles.rowContent}>
                        <View style={styles.restaurantNameContainer}>
                            <Text numberOfLines={1} style={styles.restaurantName}>
                                Sushi Kei
                        </Text>
                        </View>
                        <View style={styles.miniDetailsContainer}>
                            <View style={styles.distance}>
                                <Text numberOfLines={1} style={styles.distanceTxt}>
                                    16.5 mi
                            </Text>
                                <Text numberOfLines={1} style={styles.streetName}>
                                    Ba Huyen Thanh Quang street
                                </Text>
                                {/* <Text style={styles.remainingSeat}>
                                5
                            </Text> */}
                            </View>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.btnText}>Take-away</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.btnText}>Dine-in</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>

                {/* no image row */}
                <ImageBackground style={styles.row}
                    source={require('../Assets/resDefault_1.png')}
                    imageStyle={{ resizeMode: 'contain' }}>
                    <View style={styles.rowContentNoImage}>
                        <View style={styles.restaurantNameContainer}>
                            <Text numberOfLines={1} style={styles.restaurantName}>
                                Eat'n'Go Food Shop
                        </Text>
                        </View>
                        <View style={styles.miniDetailsContainer}>
                            <View style={styles.distance}>
                                <Text numberOfLines={1} style={styles.distanceTxt}>
                                    16.5 mi
                            </Text>
                                <Text numberOfLines={1} style={styles.streetName}>
                                    Quang Trung street
                                </Text>
                                {/* <Text style={styles.remainingSeat}>
                                5
                            </Text> */}
                            </View>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.btnText}>Take-away</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.btnText}>Dine-in</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#EBEBEB',
    },
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
    }
});