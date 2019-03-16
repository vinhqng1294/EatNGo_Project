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

import CheckBox from 'react-native-check-box';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Badge, Button } from 'react-native-elements';

export default class MenuScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTintColor: '#54b33d',
            headerStyle: { backgroundColor: 'white' },
            headerRight:
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                    marginRight: 5,
                }}>
                    <Badge
                        value={navigation.getParam('notiValue')}
                        status="primary"
                        containerStyle={{ position: 'absolute', top: -5, left: -5, zIndex: 10 }}
                    />
                    <Button
                        icon={<FontAwesome5 name={'receipt'} size={23} color={'#54b33d'} solid />}
                        type='clear'
                        title={null}
                        onPress={() => {
                            navigation.setParams({ notiValue: navigation.getParam('notiValue') + 1 });
                        }}
                    />
                </View>,
            headerLeft:
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                    marginLeft: 5,
                }}>
                    <Button
                        icon={<FontAwesome5 name={'info-circle'} size={23} color={'#54b33d'} solid />}
                        type='clear'
                        title={null}
                        onPress={() => {

                        }}
                    />
                </View>,
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
                        marginLeft: 10,
                        marginRight: 10,
                        borderBottomWidth: .7,
                        borderBottomColor: '#54b33d',
                    }} >Eat'n'Go Food Store</Text>
                </View>
        };
    };

    componentDidMount() {
        this.props.navigation.setParams({
            notiValue: 1,
        });
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <StatusBar backgroundColor="#54b33d" barStyle="light-content" />
                <View style={styles.menuSetContainer}>
                    <View style={styles.menuSetHeaderContainer}>
                        <Text style={styles.menuSetTitle}>
                            Main Food</Text>
                    </View>
                    <View style={styles.menuSetItemContainer}>
                        <TouchableOpacity style={styles.menuSetItem}
                            onPress={() => { this.props.navigation.navigate('FoodDetail') }}>
                            <Image style={styles.foodImg} source={require('../../Assets/resA.jpg')} />
                            <View style={styles.itemDetail}>
                                <Text numberOfLines={1} style={styles.foodName}>Banh Trang Tron</Text>
                                <Text numberOfLines={1} style={styles.foodPrice}>$ 32.99</Text>
                            </View>

                            {/* <CheckBox
                                style={styles.checkbox}
                                onClick={()=>{this.setState({checked: !this.state.checked})}}
                                isChecked={this.state.checked}
                                checkBoxColor='#54b33d'
                            /> */}
                        </TouchableOpacity>
                        <View style={styles.menuSetItem}>
                            <Image style={styles.foodImg} source={require('../../Assets/resB.jpg')} />
                            <View style={styles.itemDetail}>
                                <Text numberOfLines={1} style={styles.foodName}>Bun Bo Hue</Text>
                                <Text numberOfLines={1} style={styles.foodPrice}>$ 12.99</Text>
                            </View>

                            {/* <CheckBox
                                style={styles.checkbox}
                                onClick={()=>{this.setState({checked: !this.state.checked})}}
                                isChecked={this.state.checked}
                                checkBoxColor='#54b33d'
                            /> */}
                        </View>

                    </View>
                </View>

                <View style={styles.menuSetContainer}>
                    <View style={styles.menuSetHeaderContainer}>
                        <Text style={styles.menuSetTitle}>
                            Drinks</Text>
                    </View>
                    <View style={styles.menuSetItemContainer}>
                        <View style={styles.menuSetItem}>
                            <Image style={styles.foodImg} source={require('../../Assets/resA.jpg')} />
                            <View style={styles.itemDetail}>
                                <Text numberOfLines={1} style={styles.foodName}>Banh Trang Tron</Text>
                                <Text numberOfLines={1} style={styles.foodPrice}>$ 32.99</Text>
                            </View>

                            {/* <CheckBox
                                style={styles.checkbox}
                                onClick={()=>{this.setState({checked: !this.state.checked})}}
                                isChecked={this.state.checked}
                                checkBoxColor='#54b33d'
                            /> */}
                        </View>
                        <View style={styles.menuSetItem}>
                            <Image style={styles.foodImg} source={require('../../Assets/resB.jpg')} />
                            <View style={styles.itemDetail}>
                                <Text numberOfLines={1} style={styles.foodName}>Bun Bo Hue</Text>
                                <Text numberOfLines={1} style={styles.foodPrice}>$ 12.99</Text>
                            </View>

                            {/* <CheckBox
                                style={styles.checkbox}
                                onClick={()=>{this.setState({checked: !this.state.checked})}}
                                isChecked={this.state.checked}
                                checkBoxColor='#54b33d'
                            /> */}
                        </View>

                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#EBEBEB',
    },
    menuSetContainer: {
        // backgroundColor: 'yellow',
        flex: 1,
        flexDirection: 'column',
        width: null,
    },
    menuSetHeaderContainer: {
        // backgroundColor: 'yellow',
        flex: 1,
        width: null,
    },
    menuSetTitle: {
        backgroundColor: '#54b33d',
        fontFamily: 'Quicksand-Bold',
        fontSize: 17,
        textAlign: 'center',
        justifyContent: 'center',
        paddingTop: 5,
        paddingBottom: 5,
        color: '#EBEBEB',
    },
    menuSetItemContainer: {
        flex: 1,
        // backgroundColor: 'yellow',
        padding: 5,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'gray'
    },
    menuSetItem: {
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'row',
        marginBottom: 5,
        borderBottomWidth: 1.5,
        borderBottomColor: '#54b33d',
        borderRightWidth: 1.5,
        borderRightColor: '#54b33d',
        borderTopWidth: .5,
        borderTopColor: 'rgb(157,157,157)',
        borderLeftWidth: .5,
        borderLeftColor: 'rgb(157,157,157)',
    },
    foodImg: {
        flex: 1,
        margin: 2,
        height: 90,
    },
    itemDetail: {
        flex: 2,
        justifyContent: 'center',
        padding: 3,
        // backgroundColor: 'red',
    },
    foodName: {
        // backgroundColor: 'lime',
        fontFamily: 'Quicksand-Medium',
        fontSize: 18,
        textAlign: 'center',
        justifyContent: 'center',
        marginLeft: 5,
        marginRight: 5,
        color: 'black',
    },
    foodPrice: {
        // backgroundColor: 'lime',
        fontFamily: 'Quicksand-Bold',
        fontSize: 18,
        textAlign: 'center',
        justifyContent: 'center',
        padding: 3,
        color: '#54b33d',
    },
    // checkbox: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // }


});