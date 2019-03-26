import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Overlay, Button } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { authLogin } from '../../../actions/index'
// import { fetchStore, fetchMoreStores, searchStore } from '../../actions/index'
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    ImageBackground,
    TouchableOpacity,
    FlatList
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';



class StoreListScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            storeList: [],
        }
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
                    }} >Stores</Text>
                </View>
        };
    };


    handleViewOrder(store) {
        this.props.navigation.navigate('EmployeeOrderList', {
            store: store
        })
    }
    componentDidMount() {
        // const { user } = this.props;
        // this.setState({
        //     storeList: user.storesEmployedIn ? user.storesEmployedIn : []
        // })
        // this.props.storeList = user.storesEmployedIn ? user.storesEmployedIn : []
        // if (!storeList || !storeList.length) {
        //     this.props.fetchStore();
        // }

        // this.props.navigation.setParams({
        //     searchValue: '',
        //     handleSearch: this.handleSearch.bind(this)
        // });
    }


    // handleSearch(value) {
    //     this.props.searchStore(value)
    // }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar style={{
                }} backgroundColor="#54b33d" barStyle="light-content" />
                <FlatList
                    data={this.props.user ? this.props.user.storesEmployedIn : []}
                    refreshing={this.props.isLoadingStores}
                    onRefresh={() => {
                        this.props.authLogin(this.props.user.phoneNumber, this.props.user.facebookId)
                    }}
                    showsHorizontalScrollIndicator={true}
                    renderItem={({ item }) =>
                        <ImageBackground
                            style={styles.row}
                            source={item.image ? { uri: item.image } : require('../../../Assets/resDefault_1.png')}
                            imageStyle={item.image ? { resizeMode: 'cover' } : { resizeMode: 'contain' }}
                        >
                            <View style={item.image ? styles.rowContent : styles.rowContentNoImage}>
                                <View style={styles.restaurantNameContainer}>
                                    <Text numberOfLines={1} style={styles.restaurantName}>
                                        {item.name}
                                    </Text>
                                </View>
                                <View style={styles.miniDetailsContainer}>
                                    <View style={styles.distance}>
                                        <Text numberOfLines={1} style={styles.distanceTxt}>
                                            {item.phone}
                                        </Text>
                                        <Text numberOfLines={1} style={styles.streetName}>
                                            Active Orders: {item.activeOrderCount}
                                        </Text>

                                    </View>
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={() => {
                                            this.handleViewOrder(item)
                                        }}
                                    >
                                        <Text style={styles.btnText}>View Orders</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ImageBackground>
                    }

                />
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
const mapStateToProps = (state) => {
    return {
        user: state.authReducer.user,
        isLoadingStores: state.authReducer.isLoadingStores,
    }
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        authLogin
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(StoreListScreen);


