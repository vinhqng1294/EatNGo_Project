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
import { Badge, Button, Divider, Overlay } from 'react-native-elements';
import CheckBox from 'react-native-check-box';

class RatingScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isVisible: true,
        }
    }
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
        };
    };

    render() {

        return (
            <Overlay isVisible={this.state.isVisible}
                onBackdropPress={() => {
                    this.setState({ isVisible: false });
                    this.props.navigation.navigate('ActiveOrderDetail');
                }
                }>
                <ScrollView style={{
                    flex: 1,
                    flexDirection: 'column',
                    backgroundColor: 'white',
                }}>
                    {/* review */}
                    <View style={styles.ratingContainer}>
                        <View style={styles.ratingHeaderWrapper}>
                            <Text numberOfLines={1} style={styles.ratingTitle}>Rating</Text>
                            {/* <Text numberOfLines={1} style={styles.avgRatingScore}>4.7 / 5</Text> */}
                        </View>
                        {/* each score title */}
                        <View style={styles.ratingContent}>
                            <Text numberOfLines={1} style={styles.ratingName}>Quality</Text>
                            <View style={styles.scoringContainer}>
                                <View style={styles.aScoreWrapper}>
                                    <View style={styles.iconWrapper}>
                                        <CheckBox
                                            style={styles.radioBtn}
                                            onClick={() => {
                                                // this.handleRadioButton(optionIndex, index)
                                            }}
                                            isChecked={true}
                                            checkBoxColor='#54b33d'
                                            checkedImage={<FontAwesome5 name={'dot-circle'} size={18} color={'#54b33d'} solid />}
                                            unCheckedImage={<FontAwesome5 name={'circle'} size={18} color={'#54b33d'}
                                            />}
                                        />
                                    </View>
                                    <Text numberOfLines={2} style={styles.iconCaption}>1</Text>
                                </View>
                                <View style={styles.aScoreWrapper}>
                                    <View style={styles.iconWrapper}>
                                        <CheckBox
                                            style={styles.radioBtn}
                                            onClick={() => {
                                                // this.handleRadioButton(optionIndex, index)
                                            }}
                                            isChecked={false}
                                            checkBoxColor='#54b33d'
                                            checkedImage={<FontAwesome5 name={'dot-circle'} size={18} color={'#54b33d'} solid />}
                                            unCheckedImage={<FontAwesome5 name={'circle'} size={18} color={'#54b33d'}
                                            />}
                                        />
                                    </View>
                                    <Text numberOfLines={2} style={styles.iconCaption}>2</Text>
                                </View>
                                <View style={styles.aScoreWrapper}>
                                    <View style={styles.iconWrapper}>
                                        <CheckBox
                                            style={styles.radioBtn}
                                            onClick={() => {
                                                // this.handleRadioButton(optionIndex, index)
                                            }}
                                            isChecked={false}
                                            checkBoxColor='#54b33d'
                                            checkedImage={<FontAwesome5 name={'dot-circle'} size={18} color={'#54b33d'} solid />}
                                            unCheckedImage={<FontAwesome5 name={'circle'} size={18} color={'#54b33d'}
                                            />}
                                        />
                                    </View>
                                    <Text numberOfLines={2} style={styles.iconCaption}>3</Text>
                                </View>
                                <View style={styles.aScoreWrapper}>
                                    <View style={styles.iconWrapper}>
                                        <CheckBox
                                            style={styles.radioBtn}
                                            onClick={() => {
                                                // this.handleRadioButton(optionIndex, index)
                                            }}
                                            isChecked={false}
                                            checkBoxColor='#54b33d'
                                            checkedImage={<FontAwesome5 name={'dot-circle'} size={18} color={'#54b33d'} solid />}
                                            unCheckedImage={<FontAwesome5 name={'circle'} size={18} color={'#54b33d'}
                                            />}
                                        />
                                    </View>
                                    <Text numberOfLines={2} style={styles.iconCaption}>4</Text>
                                </View>
                                <View style={styles.aScoreWrapper}>
                                    <View style={styles.iconWrapper}>
                                        <CheckBox
                                            style={styles.radioBtn}
                                            onClick={() => {
                                                // this.handleRadioButton(optionIndex, index)
                                            }}
                                            isChecked={false}
                                            checkBoxColor='#54b33d'
                                            checkedImage={<FontAwesome5 name={'dot-circle'} size={18} color={'#54b33d'} solid />}
                                            unCheckedImage={<FontAwesome5 name={'circle'} size={18} color={'#54b33d'}
                                            />}
                                        />
                                    </View>
                                    <Text numberOfLines={2} style={styles.iconCaption}>5</Text>
                                </View>
                            </View>
                        </View>
                        {/* each score title */}
                        <View style={styles.ratingContent}>
                            <Text numberOfLines={1} style={styles.ratingName}>Speed</Text>
                            <View style={styles.scoringContainer}>
                                <View style={styles.aScoreWrapper}>
                                    <View style={styles.iconWrapper}>
                                        <CheckBox
                                            style={styles.radioBtn}
                                            onClick={() => {
                                                // this.handleRadioButton(optionIndex, index)
                                            }}
                                            isChecked={true}
                                            checkBoxColor='#54b33d'
                                            checkedImage={<FontAwesome5 name={'dot-circle'} size={18} color={'#54b33d'} solid />}
                                            unCheckedImage={<FontAwesome5 name={'circle'} size={18} color={'#54b33d'}
                                            />}
                                        />
                                    </View>
                                    <Text numberOfLines={2} style={styles.iconCaption}>1</Text>
                                </View>
                                <View style={styles.aScoreWrapper}>
                                    <View style={styles.iconWrapper}>
                                        <CheckBox
                                            style={styles.radioBtn}
                                            onClick={() => {
                                                // this.handleRadioButton(optionIndex, index)
                                            }}
                                            isChecked={false}
                                            checkBoxColor='#54b33d'
                                            checkedImage={<FontAwesome5 name={'dot-circle'} size={18} color={'#54b33d'} solid />}
                                            unCheckedImage={<FontAwesome5 name={'circle'} size={18} color={'#54b33d'}
                                            />}
                                        />
                                    </View>
                                    <Text numberOfLines={2} style={styles.iconCaption}>2</Text>
                                </View>
                                <View style={styles.aScoreWrapper}>
                                    <View style={styles.iconWrapper}>
                                        <CheckBox
                                            style={styles.radioBtn}
                                            onClick={() => {
                                                // this.handleRadioButton(optionIndex, index)
                                            }}
                                            isChecked={false}
                                            checkBoxColor='#54b33d'
                                            checkedImage={<FontAwesome5 name={'dot-circle'} size={18} color={'#54b33d'} solid />}
                                            unCheckedImage={<FontAwesome5 name={'circle'} size={18} color={'#54b33d'}
                                            />}
                                        />
                                    </View>
                                    <Text numberOfLines={2} style={styles.iconCaption}>3</Text>
                                </View>
                                <View style={styles.aScoreWrapper}>
                                    <View style={styles.iconWrapper}>
                                        <CheckBox
                                            style={styles.radioBtn}
                                            onClick={() => {
                                                // this.handleRadioButton(optionIndex, index)
                                            }}
                                            isChecked={false}
                                            checkBoxColor='#54b33d'
                                            checkedImage={<FontAwesome5 name={'dot-circle'} size={18} color={'#54b33d'} solid />}
                                            unCheckedImage={<FontAwesome5 name={'circle'} size={18} color={'#54b33d'}
                                            />}
                                        />
                                    </View>
                                    <Text numberOfLines={2} style={styles.iconCaption}>4</Text>
                                </View>
                                <View style={styles.aScoreWrapper}>
                                    <View style={styles.iconWrapper}>
                                        <CheckBox
                                            style={styles.radioBtn}
                                            onClick={() => {
                                                // this.handleRadioButton(optionIndex, index)
                                            }}
                                            isChecked={false}
                                            checkBoxColor='#54b33d'
                                            checkedImage={<FontAwesome5 name={'dot-circle'} size={18} color={'#54b33d'} solid />}
                                            unCheckedImage={<FontAwesome5 name={'circle'} size={18} color={'#54b33d'}
                                            />}
                                        />
                                    </View>
                                    <Text numberOfLines={2} style={styles.iconCaption}>5</Text>
                                </View>
                            </View>
                        </View>
                        {/* each score title */}
                        <View style={styles.ratingContent}>
                            <Text numberOfLines={1} style={styles.ratingName}>Staff Altitude</Text>
                            <View style={styles.scoringContainer}>
                                <View style={styles.aScoreWrapper}>
                                    <View style={styles.iconWrapper}>
                                        <CheckBox
                                            style={styles.radioBtn}
                                            onClick={() => {
                                                // this.handleRadioButton(optionIndex, index)
                                            }}
                                            isChecked={true}
                                            checkBoxColor='#54b33d'
                                            checkedImage={<FontAwesome5 name={'dot-circle'} size={18} color={'#54b33d'} solid />}
                                            unCheckedImage={<FontAwesome5 name={'circle'} size={18} color={'#54b33d'}
                                            />}
                                        />
                                    </View>
                                    <Text numberOfLines={2} style={styles.iconCaption}>1</Text>
                                </View>
                                <View style={styles.aScoreWrapper}>
                                    <View style={styles.iconWrapper}>
                                        <CheckBox
                                            style={styles.radioBtn}
                                            onClick={() => {
                                                // this.handleRadioButton(optionIndex, index)
                                            }}
                                            isChecked={false}
                                            checkBoxColor='#54b33d'
                                            checkedImage={<FontAwesome5 name={'dot-circle'} size={18} color={'#54b33d'} solid />}
                                            unCheckedImage={<FontAwesome5 name={'circle'} size={18} color={'#54b33d'}
                                            />}
                                        />
                                    </View>
                                    <Text numberOfLines={2} style={styles.iconCaption}>2</Text>
                                </View>
                                <View style={styles.aScoreWrapper}>
                                    <View style={styles.iconWrapper}>
                                        <CheckBox
                                            style={styles.radioBtn}
                                            onClick={() => {
                                                // this.handleRadioButton(optionIndex, index)
                                            }}
                                            isChecked={false}
                                            checkBoxColor='#54b33d'
                                            checkedImage={<FontAwesome5 name={'dot-circle'} size={18} color={'#54b33d'} solid />}
                                            unCheckedImage={<FontAwesome5 name={'circle'} size={18} color={'#54b33d'}
                                            />}
                                        />
                                    </View>
                                    <Text numberOfLines={2} style={styles.iconCaption}>3</Text>
                                </View>
                                <View style={styles.aScoreWrapper}>
                                    <View style={styles.iconWrapper}>
                                        <CheckBox
                                            style={styles.radioBtn}
                                            onClick={() => {
                                                // this.handleRadioButton(optionIndex, index)
                                            }}
                                            isChecked={false}
                                            checkBoxColor='#54b33d'
                                            checkedImage={<FontAwesome5 name={'dot-circle'} size={18} color={'#54b33d'} solid />}
                                            unCheckedImage={<FontAwesome5 name={'circle'} size={18} color={'#54b33d'}
                                            />}
                                        />
                                    </View>
                                    <Text numberOfLines={2} style={styles.iconCaption}>4</Text>
                                </View>
                                <View style={styles.aScoreWrapper}>
                                    <View style={styles.iconWrapper}>
                                        <CheckBox
                                            style={styles.radioBtn}
                                            onClick={() => {
                                                // this.handleRadioButton(optionIndex, index)
                                            }}
                                            isChecked={false}
                                            checkBoxColor='#54b33d'
                                            checkedImage={<FontAwesome5 name={'dot-circle'} size={18} color={'#54b33d'} solid />}
                                            unCheckedImage={<FontAwesome5 name={'circle'} size={18} color={'#54b33d'}
                                            />}
                                        />
                                    </View>
                                    <Text numberOfLines={2} style={styles.iconCaption}>5</Text>
                                </View>
                            </View>
                        </View>
                        {/* each score title */}
                        <View style={styles.ratingContent}>
                            <Text numberOfLines={1} style={styles.ratingName}>Clean</Text>
                            <View style={styles.scoringContainer}>
                                <View style={styles.aScoreWrapper}>
                                    <View style={styles.iconWrapper}>
                                        <CheckBox
                                            style={styles.radioBtn}
                                            onClick={() => {
                                                // this.handleRadioButton(optionIndex, index)
                                            }}
                                            isChecked={true}
                                            checkBoxColor='#54b33d'
                                            checkedImage={<FontAwesome5 name={'dot-circle'} size={18} color={'#54b33d'} solid />}
                                            unCheckedImage={<FontAwesome5 name={'circle'} size={18} color={'#54b33d'}
                                            />}
                                        />
                                    </View>
                                    <Text numberOfLines={2} style={styles.iconCaption}>1</Text>
                                </View>
                                <View style={styles.aScoreWrapper}>
                                    <View style={styles.iconWrapper}>
                                        <CheckBox
                                            style={styles.radioBtn}
                                            onClick={() => {
                                                // this.handleRadioButton(optionIndex, index)
                                            }}
                                            isChecked={false}
                                            checkBoxColor='#54b33d'
                                            checkedImage={<FontAwesome5 name={'dot-circle'} size={18} color={'#54b33d'} solid />}
                                            unCheckedImage={<FontAwesome5 name={'circle'} size={18} color={'#54b33d'}
                                            />}
                                        />
                                    </View>
                                    <Text numberOfLines={2} style={styles.iconCaption}>2</Text>
                                </View>
                                <View style={styles.aScoreWrapper}>
                                    <View style={styles.iconWrapper}>
                                        <CheckBox
                                            style={styles.radioBtn}
                                            onClick={() => {
                                                // this.handleRadioButton(optionIndex, index)
                                            }}
                                            isChecked={false}
                                            checkBoxColor='#54b33d'
                                            checkedImage={<FontAwesome5 name={'dot-circle'} size={18} color={'#54b33d'} solid />}
                                            unCheckedImage={<FontAwesome5 name={'circle'} size={18} color={'#54b33d'}
                                            />}
                                        />
                                    </View>
                                    <Text numberOfLines={2} style={styles.iconCaption}>3</Text>
                                </View>
                                <View style={styles.aScoreWrapper}>
                                    <View style={styles.iconWrapper}>
                                        <CheckBox
                                            style={styles.radioBtn}
                                            onClick={() => {
                                                // this.handleRadioButton(optionIndex, index)
                                            }}
                                            isChecked={false}
                                            checkBoxColor='#54b33d'
                                            checkedImage={<FontAwesome5 name={'dot-circle'} size={18} color={'#54b33d'} solid />}
                                            unCheckedImage={<FontAwesome5 name={'circle'} size={18} color={'#54b33d'}
                                            />}
                                        />
                                    </View>
                                    <Text numberOfLines={2} style={styles.iconCaption}>4</Text>
                                </View>
                                <View style={styles.aScoreWrapper}>
                                    <View style={styles.iconWrapper}>
                                        <CheckBox
                                            style={styles.radioBtn}
                                            onClick={() => {
                                                // this.handleRadioButton(optionIndex, index)
                                            }}
                                            isChecked={false}
                                            checkBoxColor='#54b33d'
                                            checkedImage={<FontAwesome5 name={'dot-circle'} size={18} color={'#54b33d'} solid />}
                                            unCheckedImage={<FontAwesome5 name={'circle'} size={18} color={'#54b33d'}
                                            />}
                                        />
                                    </View>
                                    <Text numberOfLines={2} style={styles.iconCaption}>5</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    {/* end review */}
                </ScrollView>
            </Overlay>
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
        fontSize: 20,
        color: '#54b33d'
    },
    avgRatingScore: {
        fontFamily: 'Quicksand-Medium',
        fontSize: 18,
        marginLeft: 15,
    },

    
});

export default RatingScreen;