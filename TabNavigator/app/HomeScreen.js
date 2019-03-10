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
                                    12.5 mi
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
                                Eat'n'Go Food Shop
                        </Text>
                        </View>
                        <View style={styles.miniDetailsContainer}>
                            <View style={styles.distance}>
                                <Text numberOfLines={1} style={styles.distanceTxt}>
                                    12.5 mi
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
                                Eat'n'Go Food Shop
                        </Text>
                        </View>
                        <View style={styles.miniDetailsContainer}>
                            <View style={styles.distance}>
                                <Text numberOfLines={1} style={styles.distanceTxt}>
                                    12.5 mi
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
        // backgroundColor: 'purple',
        height: 100,
        width: null,
        margin: 5,
        resizeMode: 'cover',
        backgroundColor: 'gray',
    },
    rowContent: {
        backgroundColor: 'rgba(0, 0, 0, .45)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    normalText: {
        fontSize: 18,
        fontFamily: 'Quicksand',
    },
    restaurantNameContainer: {
        flex: 1,
        justifyContent: 'center',
        width: null,
    },
    restaurantName: {
        textAlign: 'center',
        justifyContent: 'center',
        fontFamily: 'Quicksand',
        fontSize: 22,
        fontWeight: 'bold',
        color: '#EBEBEB',
    },
    miniDetailsContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    distance: {
        flex: 1,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'flex-start',
        // backgroundColor: 'gray',
    },
    distanceTxt: {
        textAlign: 'center',
        fontFamily: 'Quicksand',
        fontSize: 18,
        color: '#EBEBEB',
        // backgroundColor: 'green',
        marginLeft: 10,
        fontStyle: 'italic',
    },
    button: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
    },
    btnText: {
        backgroundColor: 'green',
        padding: 5,
        color: '#EBEBEB',
        fontFamily: 'Quicksand',
        fontSize: 15,
        fontWeight: "bold",
        borderWidth: 0,
    }
});