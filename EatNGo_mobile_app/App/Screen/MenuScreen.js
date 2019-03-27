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
    Image
} from 'react-native';
import { bindActionCreators } from 'redux';
import { fetchFood, setSelectedStore, cleanCart, filterFoods } from '../../actions/index';
import { connect } from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Badge, Button, SearchBar, Icon, Overlay } from 'react-native-elements';
class MenuScreen extends Component {
	constructor(props) {
        super(props);
        this.state = {
            showFilterModal: false,
            filterCuisine: 0,
            filterCuisineName: '',
            search: ''
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
    
    filter() {
        this.props.filterFoods(this.state.search, this.state.filterCuisine);
    }

	static navigationOptions = ({ navigation }) => {
		return {
			headerTintColor: '#54b33d',
			headerStyle: { backgroundColor: 'white' },
			headerRight: (
				<View
					style={{
						justifyContent: 'center',
						alignItems: 'center',
						flex: 1,
						marginRight: 5
					}}
				>
					<Badge
						value={navigation.getParam('cartLength')}
						status="primary"
						containerStyle={{
							position: 'absolute',
							top: -5,
							left: -5,
							zIndex: 10
						}}
					/>
					<Button
						icon={
							<FontAwesome5
								name={'shopping-cart'}
								size={23}
								color={'#54b33d'}
								solid
							/>
						}
						type="clear"
						title={null}
						onPress={() => {
							navigation.navigate('OrderDetail', {
								onGoBack: () => {
									const updateCartQuantity = navigation.getParam(
										'updateCartQuantity'
									);
									updateCartQuantity();
								}
							});
						}}
					/>
				</View>
			),
			headerLeft: (
				<View
					style={{
						justifyContent: 'center',
						alignItems: 'center',
						flex: 1,
						marginLeft: 5
					}}
				>
					<Button
						icon={
							<FontAwesome5
								name={'info-circle'}
								size={23}
								color={'#54b33d'}
								solid
							/>
						}
						type="clear"
						title={null}
						onPress={() => {}}
					/>
				</View>
			),
			headerTitle: (
				<View>
					<View
						style={{
							justifyContent: 'center',
							alignItems: 'stretch',
							flex: 1
						}}
					>
						<Text
							numberOfLines={1}
							style={{
								fontFamily: 'Quicksand-Medium',
								fontSize: 20,
								textAlign: 'center',
								color: '#54b33d',
								marginLeft: 10,
								marginRight: 10,
								borderBottomWidth: 0.7,
								borderBottomColor: '#54b33d'
							}}
						>
							{navigation.getParam('storeName')}
						</Text>
					</View>
				</View>
			)
		};
	};
	componentDidMount() {
		const { navigation } = this.props;
		navigation.setParams({
			updateCartQuantity: this.updateCartQuantity.bind(this)
		});
		const store = navigation.getParam('store', null);
		const checkNewStore = this.props.store && store.id !== this.props.store.id;
		if (checkNewStore) {
			this.props.cleanCart();
		}
		this.props.setSelectedStore(store);
		this.props.fetchFood(store);
		navigation.setParams({
			cartLength: !checkNewStore ? this.props.cart.length : 0,
			storeName: store.name
		});
	}

	updateCartQuantity() {
		this.props.navigation.setParams({
			cartLength: this.props.cart.length
		});
	}
	render() {
		// this.props.navigation.setParams({
		//     cartLength: this.props.cart.length || 0,
		// })
        const navigation = this.props.navigation;
        const { search, filterCuisine } = { ... this.state };
		return (
			<ScrollView style={styles.container}>
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
						value={search}
						placeholder="Search for foods "
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
                            this.setState({
                                search: value
                            }, () => {
                                this.filter();
                            });
                        }}
					/>
					<Icon
						reverse
						name="filter-list"
						color="#54b33d"
						size={22}
						onPress={() => {
							this.openFilterModal();
						}}
					/>
				</View>

				<StatusBar backgroundColor="#54b33d" barStyle="light-content" />
				<FlatList
					data={this.props.foods}
					showsVerticalScrollIndicator={false}
					renderItem={({ item }) => (
						<View style={styles.menuSetHeaderContainer}>
							<Text style={styles.menuSetTitle}>{item.type}</Text>
							<View style={styles.menuSetItemContainer}>
								<FlatList
									data={item.foods}
									showsVerticalScrollIndicator={false}
									renderItem={({ item }) => (
										<TouchableOpacity
											style={styles.menuSetItem}
											onPress={() => {
												this.props.navigation.navigate('FoodDetail', {
													id: item.id,
													onGoBack: () => this.updateCartQuantity()
												});
											}}
										>
											<Image
												style={styles.foodImg}
												source={
													item.images.length
														? { uri: item.images[0].image }
														: require('../../Assets/resDefault_0.png')
												}
											/>
											<View style={styles.itemDetail}>
												<Text numberOfLines={1} style={styles.foodName}>
													{item.name}
												</Text>
												<Text numberOfLines={1} style={styles.foodPrice}>
													{' '}
													$ {parseFloat(item.price).toFixed(2)}
												</Text>
											</View>
										</TouchableOpacity>
									)}
								/>
							</View>
						</View>
					)}
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
                                                        this.setState({
                                                            filterCuisine: item.id,
                                                            filterCuisineName: item.name
                                                        }, () => {
                                                            this.closeFilterModal();
                                                            this.filter();
                                                        });
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
                                        this.setState({
                                            filterCuisine: 0,
                                            filterCuisineName: ''
                                        }, () => {
                                            this.closeFilterModal();
                                            this.filter();
                                        });
									}}
								>
									<Text style={styles.btnTextSecondary}>Clear</Text>
								</TouchableOpacity>
							</View>
						</View>
					</Overlay>
				</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
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
	},
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#EBEBEB'
	},
	menuSetContainer: {
		// backgroundColor: 'yellow',
		flex: 1,
		flexDirection: 'column',
		width: null
	},
	menuSetHeaderContainer: {
		// backgroundColor: 'yellow',
		flex: 1,
		width: null
	},
	menuSetTitle: {
		backgroundColor: '#54b33d',
		fontFamily: 'Quicksand-Bold',
		fontSize: 17,
		textAlign: 'center',
		justifyContent: 'center',
		paddingTop: 5,
		paddingBottom: 5,
		color: '#EBEBEB'
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
		borderTopWidth: 0.5,
		borderTopColor: 'rgb(157,157,157)',
		borderLeftWidth: 0.5,
		borderLeftColor: 'rgb(157,157,157)',
		borderRadius: 5
	},
	foodImg: {
		flex: 1,
		margin: 2,
		height: 90
	},
	itemDetail: {
		flex: 2,
		justifyContent: 'center',
		padding: 3
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
		color: 'black'
	},
	foodPrice: {
		// backgroundColor: 'lime',
		fontFamily: 'Quicksand-Bold',
		fontSize: 18,
		textAlign: 'center',
		justifyContent: 'center',
		padding: 3,
		color: '#54b33d'
	}
	// checkbox: {
	//     flex: 1,
	//     justifyContent: 'center',
	//     alignItems: 'center',
	// }
});

const mapStateToProps = state => {
	return {
        foods: state.foodReducer.filteredFoods,
        filteredFoods: state.foodReducer.filteredFoods,
		cart: state.cartReducer.cart,
        store: state.storeReducer.store,
        cuisineTypes: state.storeReducer.cuisineTypes || []
	};
	// return {
	//     storeList: state.authReducer.registerMessage,
	// }
};
const mapDispatchToProps = dispatch => {
	return bindActionCreators(
		{
			fetchFood,
			setSelectedStore,
            cleanCart,
            filterFoods
		},
		dispatch
	);
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MenuScreen);
