import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    FlatList,
    ImageBackground,
    Text,
    Alert,
    StatusBar,
    Image,
    ActivityIndicator,
} from 'react-native';
import { ORDER_STATUS } from '../../../services/constant'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Badge, Button, Divider } from 'react-native-elements';
import { fetchOrdersByStoreId, updateOrder } from "../../../actions/index";
import { connect } from "react-redux";
import call from "react-native-phone-call";
import { bindActionCreators } from "redux";
import { mapOrderStatusToName } from "../../../services/constant";
class OrderListScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            store: null
        }
        // this.navigationWillFocusListener = props.navigation.addListener('willFocus', () => {
        //     const isRefreshing = props.navigation.dangerouslyGetParent().getParam('isRefreshing')
        //     if (isRefreshing) {
        //         props.fetchOrders()                
        //     }
        // })
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
                    }} >Active Order</Text>
                </View>
        };
    };
    componentDidMount() {
        const store = this.props.navigation.getParam('store')
        this.props.fetchOrdersByStoreId(store.id);
        this.setState({ store })
    }

    handleItemOnPress(item) {
        this.props.navigation.navigate("EmployeeOrderDetail", {
            id: item.id,
            onGoBack: () => this.props.fetchOrdersByStoreId(this.state.store.id)
        });
    }
    scrollTop() {
        this.flatListRef.scrollToOffset({ animated: true, offset: 0 });
    }
    callUser = user => {
        //handler to make a call
        const args = {
            number: user.phoneNumber,
            prompt: false
        };
        call(args).catch(console.error);
    };

    render() {
        if (this.props.isLoading && !this.props.orderList.length) {
            return (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <StatusBar backgroundColor="#54b33d" barStyle="light-content" />
                    <ActivityIndicator size="large" color="#54b33d" />
                </View>
            );
        } else if (!this.props.orderList.length) {
            return (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <StatusBar backgroundColor="#54b33d" barStyle="light-content" />
                    <Text
                        style={{
                            textAlign: "center",
                            fontSize: 15,
                            fontFamily: "Quicksand-Regular"
                        }}
                    >
                        There is no active orders at the moment.
              </Text>
                    <FontAwesome5
                        style={{
                            paddingTop: 10
                        }}
                        name={"hand-holding-heart"}
                        size={23}
                        color={"#54b33d"}
                    />
                </View>
            );
        } else {
            return (
                // IF LIST IS NOT EMPTY
                <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0)" }}>
                    <StatusBar backgroundColor="#54b33d" barStyle="light-content" />
                    <View style={styles.container}>
                        {/* an order item */}
                        <FlatList
                            ref={ref => {
                                this.flatListRef = ref;
                            }}
                            data={this.props.orderList}
                            refreshing={this.props.isLoading}
                            onRefresh={() => {
                                this.props.fetchOrdersByStoreId(this.state.store.id);
                                this.scrollTop();
                            }}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <View style={styles.orderItemContainer}>
                                    <View style={styles.leftContentWrapper}>
                                        <View style={styles.restaurantNameWrapper}>
                                            <Text numberOfLines={2} style={styles.resName}>
                                                {this.state.store ? this.state.store.name : ''}
                                            </Text>
                                        </View>
                                        <View style={styles.orderIdWrapper}>
                                            <Text numberOfLines={1} style={styles.orderId}>
                                                Order:
                            <Text
                                                    numberOfLines={1}
                                                    style={{
                                                        fontFamily: "Quicksand-Medium",
                                                        fontSize: 15
                                                    }}
                                                >
                                                    {" "}
                                                    {item.id}
                                                </Text>
                                            </Text>
                                        </View>
                                        <View style={styles.orderIdWrapper}>
                                            <Text numberOfLines={1} style={styles.orderId}>
                                                Status:
                            <Text
                                                    numberOfLines={1}
                                                    style={{
                                                        fontFamily: "Quicksand-Medium",
                                                        fontSize: 15,
                                                        paddingLeft: 10
                                                    }}
                                                >
                                                    {" "}
                                                    {mapOrderStatusToName[item.status]}
                                                </Text>
                                            </Text>
                                        </View>
                                        <View style={styles.orderIdWrapper}>
                                            <Text numberOfLines={1} style={styles.orderId}>
                                                Name:
                            <Text
                                                    numberOfLines={1}
                                                    style={{
                                                        fontFamily: "Quicksand-Medium",
                                                        fontSize: 15,
                                                        paddingLeft: 10
                                                    }}
                                                >
                                                    {" "}
                                                    {item.member.name}
                                                </Text>
                                            </Text>
                                        </View>
                                        <View style={styles.viewDetailBtnWrapper}>
                                            <TouchableOpacity
                                                style={styles.viewDetailBtn}
                                                onPress={() => {
                                                    this.handleItemOnPress(item);
                                                }}
                                            >
                                                <View style={styles.iconWrapper}>
                                                    <FontAwesome5
                                                        style={styles.icons}
                                                        name={"receipt"}
                                                        size={23}
                                                        color={"white"}
                                                        solid
                                                    />
                                                </View>
                                                <Text numberOfLines={1} style={styles.buttonTitle}>
                                                    Review Order
                            </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={styles.rightContentWrapper}>
                                        <View style={styles.dateTimeWrapper}>
                                            <View style={styles.dateWrapper}>
                                                <Text numberOfLines={1} style={styles.shortDate}>
                                                    {timestampToString(item.date)}
                                                </Text>
                                            </View>
                                            <View style={styles.timeWrapper}>
                                                <Text numberOfLines={1} style={styles.shortTime}>
                                                    {timestampToTime(item.date)}
                                                </Text>
                                            </View>
                                            <View style={styles.timeWrapper}>
                                                <Text numberOfLines={1} style={styles.shortTime}>
                                                    {item.member.phoneNumber}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={styles.removeBtnWrapper}>
                                            {item.status === ORDER_STATUS.PAID ? (
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        this.callUser(item.member);
                                                    }}
                                                    style={styles.removeBtn}
                                                >
                                                    <View style={styles.iconWrapper}>
                                                        <FontAwesome5
                                                            style={styles.icons}
                                                            name={"phone"}
                                                            size={23}
                                                            color={"#54b33d"}
                                                            solid
                                                        />
                                                    </View>
                                                </TouchableOpacity>
                                            ) : null}
                                        </View>
                                    </View>
                                </View>
                            )}
                        />
                        <Divider style={styles.divider} />
                    </View>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    orderItemContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 10,
        marginBottom: 0,
        padding: 5,
        borderBottomWidth: 1.5,
        borderBottomColor: '#54b33d',
        borderRightWidth: 1.5,
        borderRightColor: '#54b33d',
        borderTopWidth: .5,
        borderTopColor: 'rgb(157,157,157)',
        borderLeftWidth: .5,
        borderLeftColor: 'rgb(157,157,157)',
        backgroundColor: 'white',
        borderRadius: 5,
    },
    leftContentWrapper: {
        flex: 5,
        flexDirection: 'column',
        // marginLeft: 5,
    },
    rightContentWrapper: {
        flex: 2,
        flexDirection: 'column',
    },
    restaurantNameWrapper: {
        flex: 1,
        marginBottom: 3,
        marginLeft: 5,
    },
    orderIdWrapper: {
        marginBottom: 3,
        flex: 1,
        marginLeft: 10,
    },
    viewDetailBtnWrapper: {
        marginBottom: 3,
        marginTop: 5,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    dateTimeWrapper: {
        marginBottom: 3,
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    removeBtnWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    resName: {
        fontFamily: 'Quicksand-Medium',
        fontSize: 17,
    },
    orderId: {
        fontFamily: 'Quicksand-Regular',
        fontSize: 15,
    },
    viewDetailBtn: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#54b33d',
        marginLeft: 30,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 3,
    },
    dateWrapper: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    timeWrapper: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    removeBtn: {
        padding: 3,
    },
    shortDate: {
        fontFamily: 'Quicksand-Medium',
        fontSize: 15,
    },
    shortTime: {
        fontFamily: 'Quicksand-Regular',
        fontSize: 15,
    },

    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#EBEBEB',
    },

    buttonTitle: {
        marginLeft: 7,
        fontFamily: 'Quicksand-Bold',
        fontSize: 15,
        color: 'white',
        textAlignVertical: 'center',
    },
    iconWrapper: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        textAlignVertical: 'center',
    },
    divider: {
        backgroundColor: '#54b33d',
        height: .7,
        marginTop: 15,
    },
});


const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            fetchOrdersByStoreId,
            updateOrder
        },
        dispatch
    );
};

const mapStateToProps = state => {
    return {
        orderList: state.orderReducer.orderList,
        isLoading: state.orderReducer.isLoading,
        createdOrder: state.orderReducer.createdOrder
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderListScreen);

function timestampToString(timestamp) {
    var date = new Date(timestamp)
    if (isToday(date)) {
        return 'Today'
    } else if (isYesterday(date)) {
        return 'Yesterday'
    } else {
        var str = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear()
        return str
    }
}
function timestampToTime(timestamp) {
    var d = new Date(timestamp)
    var hour = d.getHours() < 10 ? '0' + d.getHours() : d.getHours()
    var minute = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
    return hour + ':' + minute
}

const isToday = (someDate) => {
    const today = new Date()
    return someDate.getDate() == today.getDate() &&
        someDate.getMonth() == today.getMonth() &&
        someDate.getFullYear() == today.getFullYear()
}

const isYesterday = (someDate) => {
    var today = new Date()
    today.setHours(0, 0, 0, 0)
    const newSomeDate = new Date(someDate)
    newSomeDate.setHours(0, 0, 0, 0)
    var timeDiff = newSomeDate.getTime() - today.getTime()
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays == -1
}