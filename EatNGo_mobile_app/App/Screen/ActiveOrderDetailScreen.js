import React, { Component } from "react";
import {
	StyleSheet,
	View,
	TouchableOpacity,
	FlatList,
	ImageBackground,
	Text,
	ScrollView,
	StatusBar,
	Alert,
	Image,
	Dimensions
} from "react-native";

import CheckBox from "react-native-check-box";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Badge, Button, Divider, Overlay } from "react-native-elements";
import { fetchOrderById, updateOrder } from "../../actions/index";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { mapOrderStatusToName } from "../../services/constant";
import { ORDER_STATUS } from '../../services/constant'
class OrderDetailScreen extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isVisible: true,
		}
	}
	static navigationOptions = ({ navigation }) => {
		return {
			headerTintColor: '#54b33d',
			headerStyle: { backgroundColor: 'white' },
			headerRight:
				<View style={{
					height: 0,
					width: 0,
					borderBottomWidth: 28,
					borderBottomColor: '#54b33d',
					borderTopWidth: 28,
					borderTopColor: '#54b33d',
					borderLeftWidth: 28,
					borderLeftColor: 'white',
					justifyContent: 'center',
					alignItems: 'center',
					marginRight: 0,
					// backgroundColor: 'black',
				}}></View>,
			headerLeft:
				<View style={{
					height: 0,
					width: 0,
					borderBottomWidth: 28,
					borderBottomColor: '#54b33d',
					borderTopWidth: 28,
					borderTopColor: '#54b33d',
					borderRightWidth: 28,
					borderRightColor: 'white',
					justifyContent: 'center',
					alignItems: 'center',
					marginRight: 0,
					// backgroundColor: 'black',
				}}></View>,
			headerTitle:
				<View style={{
					// justifyContent: 'center',
					alignItems: 'flex-start',
					flex: 1,
					flexDirection: 'row',
					borderBottomWidth: .7,
					borderBottomColor: '#54b33d',
					// backgroundColor: 'black',
				}}>
					<Text numberOfLines={1} style={{
						flex: 1,
						textAlign: 'left',
						fontFamily: 'Quicksand-Bold',
						fontSize: 18,
						color: '#757575',
						// backgroundColor: 'yellow',
					}}> ORDER</Text>
					<Text numberOfLines={1} style={{
						flex: 2.7,
						fontFamily: 'Quicksand-Medium',
						fontSize: 18,
						textAlign: 'center',
						paddingRight: 10,
						color: '#757575',
						textAlignVertical: 'center',
						// backgroundColor: 'black',
					}} >#{navigation.getParam('id', "")}</Text>
				</View>
		};
	};

	componentDidMount() {
		const id = this.props.navigation.getParam("id", null);
		this.props.navigation.setParams({
			id
		})
		this.props.fetchOrderById(id);
	}

	getTotalPrice(order) {
		const totalPrice = order.reduce((acc, item) => {
			return acc + parseFloat(item.price) * item.quantity;
		}, 0.0);
		return totalPrice.toFixed(2);
	}

	render() {
		const { order } = this.props;
		if (order) {
			const totalPrice = this.getTotalPrice(order.orderDetails)
			let discountPrice = 0
			if (order.promotionCode) {
				discountPrice = (totalPrice * (order.promotionCode.percentageDiscount / 100)).toFixed(2)
			}
			const totalPriceAfterDiscount = order.totalPrice.toFixed(2)
			return (
				<View style={{ flex: 1 }}>
					<StatusBar backgroundColor="#54b33d" barStyle="light-content" />
					<ScrollView style={styles.container}>

						<View style={styles.orderInfoContainer}>
							<View style={styles.statusWrapper}>
								<Text style={styles.statusTitle}>Status:
                <Text style={styles.statusText}> {mapOrderStatusToName[order.status]}</Text></Text>

							</View>
							<View style={styles.datatimeWrapper}>
								<Text style={styles.date}>{timestampToString(order.date)}</Text>
								<Text style={styles.time}>{timestampToTime(order.date)}</Text>
							</View>
						</View>

						<View style={styles.orderItemsContainer}>
							{/* Flat list items */}
							<FlatList
								data={order.orderDetails}
								showsVerticalScrollIndicator={false}
								renderItem={({ item }) =>
									<View style={styles.orderItemWrapper}>
										<View style={styles.mainItemContainer}>
											<View style={styles.quantityWrapper}>
												<Text numberOfLines={1} style={styles.quantity}>{item.quantity} x</Text>
											</View>
											<View style={styles.foodNameWrapper}>
												<Text numberOfLines={2} style={styles.foodName}>{item.food.name}</Text>
											</View>
											<View style={styles.priceWrapper}>
												<Text numberOfLines={1} style={styles.price}>$ {parseFloat(item.price).toFixed(2)}</Text>
											</View>
										</View>
										{/* extra item */}
										<FlatList
											data={item.attributes}
											showsVerticalScrollIndicator={false}
											renderItem={({ item }) =>
												<View>
													<View style={styles.extraTitleWrapper}>
														<View style={{ flex: 1, paddingLeft: 3, }}></View>
														<Text numberOfLines={1} style={styles.extraTitle}>{item.name}</Text>
													</View>
													<FlatList
														data={item.options}
														renderItem={({ item }) =>
															<View style={styles.extraItemContainer}>
																<View style={styles.extraQuantityWrapper}>
																</View>
																<View style={styles.extraDetailWrapper}>
																	<Text numberOfLines={1} style={styles.extraItem}>+ {item.name}</Text>
																</View>
																<View style={styles.priceWrapper}>
																	<Text numberOfLines={1} style={styles.extraPrice}>$ {item.price}</Text>
																</View>
																{/* NEW+++++ implement on press */}
																{/* <TouchableOpacity style={styles.removeBtnContainer}>
                                  <View style={styles.removeBtn}>
                                    <FontAwesome5
                                      name={'times'}
                                      color={'#54b33d'}
                                      size={12}
                                      solid
                                    />
                                  </View>
                                </TouchableOpacity> */}
															</View>
														}
													/>
												</View>
											}
										/>

										{/* NEW ++++ comment */}
										{/* <View>
                                <View style={styles.extraTitleWrapper}>
                                    <Text numberOfLines={1} style={styles.extraTitle}>Special Requests</Text>
                                </View>
                                <View style={styles.extraItemContainer}>
                                    <View style={styles.commentWrapper}>
                                        <Text numberOfLines={5} style={styles.extraItem}>nhieu da, nhieu ot, nhieu rau, sdas, asd, as,d a,sdasd, ,asd,as</Text>
                                    </View>
                                    <TouchableOpacity style={styles.removeBtnContainer}>
                                        <View style={styles.removeBtn}>
                                            <FontAwesome5
                                                name={'times'}
                                                color={'#54b33d'}
                                                size={12}
                                                solid
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View> */}

									</View>
								}
							/>
						</View>

						<Divider style={styles.divider} />
						{order.promotionCode ?
							<View>
								<View style={styles.longBtn}>
									<View style={styles.iconWrapper}>
										<FontAwesome5
											style={styles.icons}
											name={'gifts'}
											size={23}
											color={'#54b33d'}
											solid
										/>
									</View>
									<Text numberOfLines={1} style={styles.iconText}>{order.promotionCode.code} - {order.promotionCode.percentageDiscount}% </Text>
								</View>
								<Divider style={styles.divider} />
							</View> : null
						}




						<View style={styles.priceSummaryContainer}>
							<View style={styles.priceSummaryWrapper}>
								<Text numberOfLines={1} style={styles.priceInfoTxt}>Sub-total</Text>
								<Text numberOfLines={1} style={styles.priceInfo}>$ {totalPrice}</Text>
							</View>
							{order.promotionCode ?
								<View style={styles.priceSummaryWrapper}>
									<Text numberOfLines={1} style={styles.priceInfoTxt}>Discount</Text>
									<Text numberOfLines={1} style={styles.priceInfo}>- $ {discountPrice}</Text>
								</View> : null
							}
							<View style={styles.totalWrapper}>
								<Text numberOfLines={1} style={styles.totalTxt}>Total</Text>
								<Text numberOfLines={1} style={styles.total}>$ {totalPriceAfterDiscount}</Text>
							</View>
						</View>

						<Divider style={styles.divider} />

						<View style={styles.addMoreItemContainer}>
							<TouchableOpacity style={styles.addMoreItemWrapper}
								onPress={() => { this.props.navigation.navigate('Rating') }}>
								<View style={styles.iconWrapper}>
									<FontAwesome5
										style={styles.icons}
										name={'hand-point-right'}
										size={14}
										color={'#54b33d'}
										solid
									/>
								</View>
								<Text numberOfLines={1} style={styles.addMoreItemTxt}>Rate your order here!</Text>
							</TouchableOpacity>
						</View>
					</ScrollView>
					{order.status === ORDER_STATUS.PAID ?
						<TouchableOpacity style={styles.cancelBtn}
							onPress={() => {
								Alert.alert(
									'Cancel Order',
									'Are you sure to cancel this order?',
									[
										{
											text: 'No',
											onPress: () => console.log('Cancel Pressed'),
											style: 'cancel',
										},
										{
											text: 'Yes', onPress: () => {
												this.props.updateOrder(order.id, ORDER_STATUS.CANCELLED)
												Alert.alert(
													'Cancel Order',
													'Cancel Order Successfully',
													[
														{
															text: 'OK', onPress: () => {
																this.props.navigation.state.params.onGoBack();
																this.props.navigation.goBack()
															}
														},
													],
													{ cancelable: false }
												);
											}
										},
									],
									{ cancelable: true }
								);
							}}>
							<View style={styles.iconWrapper}>
								<FontAwesome5
									style={styles.icons}
									name={'times'}
									size={23}
									color={'white'}
									solid
								/>
							</View>
							<Text numberOfLines={1} style={styles.buttonTitle}>Cancel</Text>
						</TouchableOpacity>
						: null}


				</View>
			);
		} else {
			return (
				<View style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
				}}>
					<StatusBar backgroundColor="#54b33d" barStyle="light-content" />
					<Text style={{
						textAlign: 'center',
						fontSize: 15,
						fontFamily: 'Quicksand-Regular',
					}}>Did you forget to order something?</Text>
					<TouchableOpacity
						onPress={() => { this.props.navigation.goBack() }}>
						<Text style={{
							textAlign: 'center',
							fontSize: 18,
							fontFamily: 'Quicksand-Bold',
							color: '#54b33d'
						}}>Go to Active Orders</Text>
					</TouchableOpacity>
				</View>
			);
		}
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
	orderInfoContainer: {
		flex: 1,
		flexDirection: 'row',
		paddingTop: 15,
	},
	statusWrapper: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
		paddingRight: 10,
	},
	datatimeWrapper: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		// paddingLeft: 10,
	},
	statusTitle: {
		fontFamily: 'Quicksand-Regular',
		fontSize: 15,
		color: 'gray',
	},
	statusText: {
		fontFamily: 'Quicksand-Medium',
		fontSize: 20,
		color: '#54b33d',
	},
	date: {
		fontFamily: 'Quicksand-Medium',
		fontSize: 15,
		color: '#54b33d',
		paddingRight: 20,
	},
	time: {
		fontFamily: 'Quicksand-Regular',
		fontSize: 15,
		color: '#54b33d',
		paddingRight: 20,
	},

	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#EBEBEB',
		// height: 1000
	},
	orderItemsContainer: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: 'white',
		borderRadius: 9,
		margin: 15,
		padding: 10,
		borderWidth: .3,
		borderColor: '#54b33d'
	},
	orderItemWrapper: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'stretch',
		borderBottomColor: '#54b33d',
		borderBottomWidth: .57,
		paddingBottom: 3,
		paddingTop: 3,
	},
	mainItemContainer: {
		flex: 1,
		flexDirection: 'row',
	},
	quantityWrapper: {
		flex: 1,
		paddingLeft: 5,
	},
	foodNameWrapper: {
		flex: 7,
		paddingLeft: 3,
		paddingRight: 3,
	},
	priceWrapper: {
		flex: 3,
		paddingLeft: 10,
	},
	removeBtnContainer: {
		flex: 1,
		alignItems: 'center',
	},
	removeBtn: {
		paddingTop: 5,
	},
	extraTitleWrapper: {
		flex: 1,
		flexDirection: 'row',
	},
	extraItemContainer: {
		flex: 1,
		flexDirection: 'row',
	},
	extraQuantityWrapper: {
		flex: 1,
		alignItems: 'flex-end',
		paddingLeft: 3,
	},
	extraDetailWrapper: {
		flex: 7,
		paddingLeft: 3,
		paddingRight: 3,
	},
	quantity: {
		fontFamily: 'Quicksand-Medium',
		fontSize: 15,
		color: 'gray',
	},
	foodName: {
		fontFamily: 'Quicksand-Medium',
		fontSize: 15,
		color: 'black',
	},
	price: {
		fontFamily: 'Quicksand-Medium',
		fontSize: 15,
		color: 'gray',
	},
	extraTitle: {
		flex: 11,
		paddingLeft: 10,
		paddingRight: 3,
		fontFamily: 'Quicksand-Medium',
		fontSize: 13,
		color: 'gray',
	},
	extraItem: {
		paddingLeft: 20,
		fontFamily: 'Quicksand-Regular',
		fontSize: 13,
		color: 'gray',
	},
	extraPrice: {
		fontFamily: 'Quicksand-Medium',
		fontSize: 13,
		color: 'gray',
		paddingLeft: 3,
	},
	commentWrapper: {
		flex: 11,
		paddingLeft: 13,
		paddingRight: 3,
		fontFamily: 'Quicksand-Medium',
		fontSize: 13,
		color: 'gray',
	},
	divider: {
		backgroundColor: '#54b33d',
		height: .7,
		marginBottom: 15,
	},
	longBtn: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: 'white',
		borderRadius: 9,
		margin: 15,
		marginTop: 0,
		padding: 10,
		borderWidth: .3,
		borderColor: '#54b33d',
		justifyContent: 'flex-start',
	},
	iconText: {
		marginLeft: 15,
		fontFamily: 'Quicksand-Bold',
		fontSize: 15,
		color: '#54b33d',
		textAlignVertical: 'center',
	},

	cardText: {
		marginLeft: 15,
		fontFamily: 'Quicksand-Bold',
		fontSize: 20,
		color: '#54b33d',
		textAlignVertical: 'center',
	},
	addMoreItemContainer: {
		flex: 1,
		flexDirection: 'column',
		// backgroundColor: 'yellow',
		justifyContent: 'center',
		margin: 15,
		marginBottom: 0,
		alignItems: 'flex-end',
	},
	addMoreItemWrapper: {
		flex: 0,
		flexDirection: 'row',
		// backgroundColor: 'red',
	},
	addMoreItemTxt: {
		flex: 0,
		textAlignVertical: 'center',
		marginLeft: 15,
		marginRight: 15,
		fontFamily: 'Quicksand-Medium',
		fontSize: 15,
		color: '#54b33d',
	},
	btnContentWrapper: {
		flex: 0,
		flexDirection: 'row',
		backgroundColor: 'black',
	},
	priceSummaryContainer: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#EBEBEB',
		margin: 15,
		marginTop: 0,
		padding: 10,
		// borderWidth: .3,
		// borderColor: '#54b33d',
	},
	priceSummaryWrapper: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'stretch',
		justifyContent: 'center',
		// backgroundColor: 'green',
		marginLeft: 3,
		marginRight: 3,
	},
	totalWrapper: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'stretch',
		justifyContent: 'center',
		// backgroundColor: 'green',
		marginTop: 5,
		borderTopWidth: .5,
		borderTopColor: '#757575',
		paddingTop: 3,
	},
	priceInfoTxt: {
		flex: 1,
		fontFamily: 'Quicksand-Regular',
		fontSize: 15,
		color: '#757575',
		textAlign: 'left',
	},
	priceInfo: {
		flex: 1,
		fontFamily: 'Quicksand-Regular',
		fontSize: 15,
		color: '#757575',
		textAlign: 'right',
	},
	totalTxt: {
		flex: 1,
		fontFamily: 'Quicksand-Medium',
		fontSize: 18,
		color: 'black',
		textAlign: 'left',
	},
	total: {
		flex: 1,
		fontFamily: 'Quicksand-Bold',
		fontSize: 18,
		color: '#54b33d',
		textAlign: 'right',
	},
	cancelBtn: {
		flex: 1,
		flexDirection: 'row',
		position: 'absolute',
		left: Dimensions.get('window').width / 2,
		bottom: 10,
		zIndex: 100,
		transform: [{ 'translateX': -300 / 2 }],
		backgroundColor: 'rgba(169, 4, 4, .8)',
		width: 300,
		height: 40,
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',
		textAlignVertical: 'center',
		padding: 10,
		borderWidth: .3,
		borderColor: '#A90404',
	},
	buttonTitle: {
		marginLeft: 15,
		marginRight: 10,
		fontFamily: 'Quicksand-Bold',
		fontSize: 15,
		color: 'white',
		textAlignVertical: 'center',
	},

});

function initMapStateToProps(state) {
	return {
		order: state.orderReducer.order
	};
}

function initMapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			fetchOrderById,
			updateOrder
		},
		dispatch
	);
}

export default connect(
	initMapStateToProps,
	initMapDispatchToProps
)(OrderDetailScreen);

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