import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    FlatList,
    ImageBackground,
    Text,
    ScrollView,
    StatusBar,
    Image,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { fetchFood, setSelectedStore, cleanCart } from '../../actions/index'
import { connect } from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Badge, Button, Divider } from 'react-native-elements';
import CheckBox from 'react-native-check-box';

class StoreInfoReviewScreen extends Component {
    constructor(props) {
        super(props)
    }
    static navigationOptions = ({ navigation }) => {
        return {
            headerTintColor: '#54b33d',
            headerStyle: { backgroundColor: 'white' },
            headerRight:
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 100,
                    marginRight: 5,
                    marginLeft: 5,
                }}>
                    <Text numberOfLines={1} style={{
                        fontFamily: 'Quicksand-Bold',
                        fontSize: 20,
                        color: 'gray'
                    }}>Closed</Text>
                </View>,
            headerLeft: null,
            headerTitle:
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                    marginLeft: 10,
                    marginRight: 70,
                }}>
                    <Text numberOfLines={1} style={{
                        fontFamily: 'Quicksand-Medium',
                        fontSize: 20,
                        textAlign: 'center',
                        color: '#54b33d',
                    }} >CHF 1</Text>
                </View>
        };
    };

    render() {

        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={styles.container}>
                    {/* day */}
                    <View style={styles.scheduleContainer}>
                        <View style={styles.dayWrapper}>
                            <Text style={styles.text}>Monday</Text>
                            <Text style={styles.hour}>8 - 20</Text>
                        </View>
                        <View style={styles.dayWrapper}>
                            <Text style={styles.text}>Tuesday</Text>
                            <Text style={styles.hour}>8 - 20</Text>
                        </View>
                        <View style={styles.dayWrapper}>
                            <Text style={styles.text}>Wednesday</Text>
                            <Text style={styles.hour}>8 - 20</Text>
                        </View>
                        <View style={styles.dayWrapper}>
                            <Text style={styles.text}>Thursday</Text>
                            <Text style={styles.hour}>8 - 20</Text>
                        </View>
                        <View style={styles.dayWrapper}>
                            <Text style={styles.text}>Friday</Text>
                            <Text style={styles.hour}>8 - 20</Text>
                        </View>
                        <View style={styles.dayWrapper}>
                            <Text style={styles.text}>Saturday</Text>
                            <Text style={styles.hour}>8 - 20</Text>
                        </View>
                        <View style={styles.dayWrapper}>
                            <Text style={styles.text}>Sunday</Text>
                            <Text style={styles.hour}>8 - 20</Text>
                        </View>
                    </View>
                    {/* end day */}
                    <Divider style={styles.divider} />

                </ScrollView>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    ratingContent: {
        flex: 1,
        // backgroundColor: 'yellow',
    },
    ratingName: {
        fontFamily: 'Quicksand-Medium',
        fontSize: 15,
        padding: 3,
    },
    scoringContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    aScoreWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 3,
        // backgroundColor: 'green',
    },
    iconWrapper: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        textAlignVertical: 'center',
        // backgroundColor: 'green'
    },
    icons: {
        // backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconCaption: {
        textAlign: 'center',
        fontFamily: 'Quicksand-Medium',
        fontSize: 15,
    },
    divider: {
        backgroundColor: '#54b33d',
        height: .7,
        // marginBottom: 10,
    },
    ratingContainer: {
        flex: 1,
        margin: 5,

    },
    ratingHeaderWrapper: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
        padding: 3,
    },
    ratingTitle: {
        fontFamily: 'Quicksand-Bold',
        fontSize: 18,
        color: '#54b33d'
    },
    avgRatingScore: {
        fontFamily: 'Quicksand-Medium',
        fontSize: 18,
        marginLeft: 15,
    },

    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#EBEBEB',
    },
    scheduleContainer: {
        flex: 1,
        marginTop: 10,
        marginBottom: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    dayWrapper: {
        flex: 1,
        flexDirection: 'row',
    },
    text: {
        flex: 1,
        marginLeft: 15,
        textAlignVertical: 'center',
        paddingTop: 3,
        paddingBottom: 3,
        fontFamily: 'Quicksand-Regular',
        fontSize: 15,
    },
    hour: {
        flex: 2,
        marginRight: 15,
        textAlignVertical: 'center',
        paddingTop: 3,
        paddingBottom: 3,
        fontFamily: 'Quicksand-Medium',
        fontSize: 15,
    }
});

export default StoreInfoReviewScreen;