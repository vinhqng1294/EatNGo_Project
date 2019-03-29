import React, { Component } from 'react';
import { connect } from 'react-redux';
import StoreList from '../Components/StoreList';
import { Overlay, Button, Icon } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import {
	fetchStore,
	fetchMoreStores,
	searchStore,
	fetchCuisineTypes
} from '../../actions/index';
import {
	StyleSheet,
	View,
	Text,
	StatusBar,
	TouchableOpacity,
	PermissionsAndroid,
	AsyncStorage
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { SearchBar } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import firebase from 'react-native-firebase';
import type { Notification, NotificationOpen } from 'react-native-firebase';
import { getStatusString } from '../../utils/index'
class HomeScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showFilterModal: false
		};
	}

	openFilterModal() {
		this.setState({
			showFilterModal: true
		});
	}

	closeFilterModal() {
		this.setState({
			showFilterModal: false
		});
	}

	componentWillUnmount() {
		this.notificationListener();
		this.notificationOpenedListener();
	}

	async createNotificationListeners() {

		this.notificationListener = firebase.notifications().onNotification((notification: Notification) => {
			console.log(notification)
		});

		this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
			const notification = notificationOpen.notification;
			if (notification.data.type === 'HAS_NEW_ORDER') {
				this.props.navigation.navigate("EmployeeOrderDetail", {
					id: notification.data.orderId,
				});
			}
			else {
				this.props.navigation.navigate("ActiveOrderDetail", {
					id: notification.data.orderId,
				});
			}
		});
		this.messageListener = firebase.messaging().onMessage((message) => {
			const channel = new firebase.notifications.Android.Channel(
				'channelId',
				'Channel Name',
				firebase.notifications.Android.Importance.Max
			).setDescription('A natural description of the channel');
			firebase.notifications().android.createChannel(channel);
			const notification = new firebase.notifications.Notification({
				sound: 'default',
				show_in_foreground: true,
			})
				.setNotificationId('notificationId')
				.setTitle('EatNGo')
				.setData(message.data)
				// .setBody(`Your order #${message.data.orderId} is ${getStatusString(message.data.type)}`)
				.setBody(message.data.type === 'HAS_NEW_ORDER' ? 'You have new order' : `Your order #${message.data.orderId} is ${getStatusString(message.data.type)}`)
				.android.setChannelId('test-channel')
				.android.setSmallIcon('ic_launcher')
				.android.setPriority(firebase.notifications.Android.Priority.High);

			firebase.notifications()
				.displayNotification(notification)
				.catch(err => console.error(err));
		});
	}



	async requestLocationPermission() {
		try {
			return await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
				{
					title: 'Eat&Go Location Permission',
					message:
						'Eat&Go needs access to your location to show you food shops near you.',
					buttonNeutral: 'Ask Me Later',
					buttonNegative: 'No',
					buttonPositive: 'Grant Access'
				}
			);
		} catch (err) {
			return PermissionsAndroid.RESULTS.DENIED;
		}
	}
	async checkLocationPermission() {
		const hasPermission = await PermissionsAndroid.check(
			PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
		);
		if (!hasPermission) {
			const granted = await this.requestLocationPermission();
			return granted === PermissionsAndroid.RESULTS.GRANTED;
		}
		return true;
	}

	static navigationOptions = ({ navigation }) => {
		return {
			headerTintColor: 'white',
			headerStyle: { backgroundColor: '#54b33d' },
			headerRight: null,
			headerLeft: null,
			headerTitle: (
				<View
					style={{
						justifyContent: 'center',
						alignItems: 'stretch',
						flex: 1,
						flexDirection: 'row',
						backgroundColor: '#54b33d'
						// backgroundColor: 'yellow',
					}}
				>
					<SearchBar
						value={navigation.getParam('searchValue')}
						placeholder="Search for restaurants "
						placeholderTextColor="rgba(255,255,255,.4)"
						searchIcon={
							<FontAwesome5 name={'search'} size={15} color={'white'} solid />
						}
						containerStyle={{
							backgroundColor: '#54b33d',
							flexGrow: 1
						}}
						inputContainerStyle={{
							backgroundColor: 'rgba(0, 0, 0, .25)'
						}}
						inputStyle={{
							// backgroundColor: 'black',
							fontFamily: 'Quicksand-Medium',
							fontSize: 15,
							textAlignVertical: 'center',
							color: 'white'
						}}
						onChangeText={value => {
							navigation.setParams({ searchValue: value });
							let handleSearch = navigation.getParam('handleSearch');
							const filterCuisine = navigation.getParam('filterCuisine');
							handleSearch(value, {
								filterCuisine
							});
						}}
					/>
					<Icon
						reverse
						name="filter-list"
						color="#54b33d"
						size={22}
						onPress={() => {
							const openModal = navigation.getParam('openModal');
							openModal();
						}}
					/>
				</View>
			)
		};
	};

	async componentDidMount() {

		const { storeList } = this.props;
		this.createNotificationListeners()
		const hasCurrentLocation = await this.checkLocationPermission();
		let location;
		if (hasCurrentLocation) {
			navigator.geolocation.getCurrentPosition(async position => {
				const { latitude, longitude } = { ...position.coords };
				location = {
					latitude,
					longitude
				};
				await AsyncStorage.setItem('location', JSON.stringify(location));
				this.loadStores(storeList, location);
			}, async error => {
				this.loadStores(storeList);
				await AsyncStorage.removeItem('location');
			});
		} else {
			this.loadStores(storeList);
			await AsyncStorage.removeItem('location');
		}

		this.props.fetchCuisineTypes();

		this.props.navigation.setParams({
			searchValue: '',
			handleSearch: this.handleSearch.bind(this),
			openModal: this.openFilterModal.bind(this)
		});
	}

	loadStores(storeList, location) {
		if (!storeList || !storeList.length) {
			const searchValue = this.props.navigation.getParam('searchValue');
			const filterCuisine = this.props.navigation.getParam('filterCuisine');
			this.props.fetchStore(
				null,
				{
					search: searchValue || '',
					filterCuisine: filterCuisine || ''
				},
				location
			);
		}
	}

	handleSearch(value = '', filterTypes) {
		this.props.searchStore(value, filterTypes);
	}
	render() {
		const searchValue = this.props.navigation.getParam('searchValue');
		const filterCuisine = this.props.navigation.getParam('filterCuisine');
		return (
			<View style={styles.container}>
				<StatusBar
					style={{}}
					backgroundColor="#54b33d"
					barStyle="light-content"
				/>
				<StoreList
					extraData={this.props}
					onEndReached={this.props.fetchMoreStores.bind(this, {
						search: searchValue,
						filterCuisine
					})}
					isLoadingOrders={this.props.isLoadingOrders}
					storeList={this.props.storeList}
					fetchStore={this.props.fetchStore.bind(this, {
						search: searchValue,
						filterCuisine
					})}
				/>
				<View style={{ marginTop: 22 }}>
					<Overlay
						isVisible={this.state.showFilterModal}
						onBackdropPress={() => this.closeFilterModal()}
					>
						<View style={{ marginTop: 22 }}>
							<View style={styles.filterHeaderWrapper}>
								<Text numberOfLines={1} style={styles.filterTitle}>
									Filter
								</Text>
							</View>
							<View style={styles.cuisineTypesWrapper}>
								<FlatList
									data={this.props.cuisineTypes}
									renderItem={({ item }) => (
										<View key={item.id} style={styles.aScoreWrapper}>
											<View style={styles.iconWrapper}>
												<TouchableOpacity
													style={[
														styles.filterButton,
														item.id === filterCuisine
															? styles.activeFilterButton
															: null
													]}
													onPress={() => {
														this.props.navigation.setParams({
															filterCuisine: item.id
														});
														this.handleSearch(searchValue, {
															filterCuisine: item.id
														});
														this.closeFilterModal();
													}}
												>
													<Text
														style={[
															styles.filterButtonText,
															item.id === filterCuisine
																? styles.activeFilterButtonText
																: null
														]}
													>
														{item.name}
													</Text>
												</TouchableOpacity>
											</View>
										</View>
									)}
								/>
							</View>
							<View style={styles.actionButtonWrapper}>
								<TouchableOpacity
									style={styles.button}
									onPress={() => {
										this.props.navigation.setParams({
											filterCuisine: 0
										});
										this.handleSearch(searchValue, {
											filterCuisine: 0
										});
										this.closeFilterModal();
									}}
								>
									<Text style={styles.btnTextSecondary}>Clear</Text>
								</TouchableOpacity>
							</View>
						</View>
					</Overlay>
				</View>
			</View>
		);
	}
}
const mapStateToProps = state => {
	console.log(state)
	return {
		storeList: state.storeReducer.storeList,
		isLoadingOrders: state.storeReducer.isLoadingOrders,
		isLoadingMoreStores: state.storeReducer.isLoadingMoreStores,
		cuisineTypes: state.storeReducer.cuisineTypes || []
	};
	// return {
	//     storeList: state.authReducer.registerMessage,
	// }
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#EBEBEB'
	},
	icons: {
		// backgroundColor: 'black',
		justifyContent: 'center',
		alignItems: 'center'
	},
	radioBtn: {
		marginRight: 10
	},
	iconCaption: {
		textAlign: 'center',
		fontFamily: 'Quicksand-Medium',
		fontSize: 15
	},
	filterHeaderWrapper: {
		marginLeft: 10,
		marginRight: 10,
		marginTop: 10,
		padding: 3
	},
	filterTitle: {
		fontFamily: 'Quicksand-Bold',
		fontSize: 20,
		color: '#54b33d'
	},
	btnText: {
		backgroundColor: '#54b33d',
		padding: 5,
		color: '#EBEBEB',
		fontFamily: 'Quicksand-Bold',
		fontSize: 15,
		borderWidth: 0
	},
	btnTextSecondary: {
		color: '#54b33d',
		fontFamily: 'Quicksand-Bold',
		fontSize: 15
	},
	button: {
		flex: 0,
		justifyContent: 'center',
		alignItems: 'center',
		margin: 5
	},
	cuisineTypesWrapper: {
		margin: 20
	},
	actionButtonWrapper: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 90
	},
	aScoreWrapper: {
		padding: 3
	},
	iconWrapper: {
		flex: 0,
		flexDirection: 'row'
	},
	filterButton: {
		borderRadius: 25,
		width: '100%',
		marginBottom: 15,
		borderColor: '#54b33d',
		borderWidth: 1,
		padding: 12
	},
	activeFilterButton: {
		backgroundColor: '#54b33d',
		borderWidth: 0
	},
	filterButtonText: {
		color: '#54b33d',
		textAlign: 'center'
	},
	activeFilterButtonText: {
		color: 'white'
	}
});
const mapDispatchToProps = dispatch => {
	return bindActionCreators(
		{
			fetchStore,
			searchStore,
			fetchMoreStores,
			fetchCuisineTypes
		},
		dispatch
	);
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HomeScreen);
