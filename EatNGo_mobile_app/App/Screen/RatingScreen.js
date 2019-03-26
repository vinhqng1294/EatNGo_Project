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
import { createReview, deleteReview } from '../../actions/index';
import { connect } from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Badge, Button, Divider, Overlay } from 'react-native-elements';
import CheckBox from 'react-native-check-box';

class RatingScreen extends Component {
	constructor(props) {
		super(props);
		const { quality = 0, cleanliness = 0, speed = 0, staffAttitude = 0 } = {
			...props.navigation.getParam('order')
		};
		this.state = {
			stats: [
				{
					name: 'Quality',
					key: 'quality'
				},
				{
					name: 'Speed',
					key: 'speed'
				},
				{
					name: 'Staff Attitude',
					key: 'staffAttitude'
				},
				{
					name: 'Cleanliness',
					key: 'cleanliness'
				}
			],
			scores: {
				quality,
				cleanliness,
				speed,
				staffAttitude
			},
			isVisible: true
		};
	}
	static navigationOptions = ({ navigation }) => {
		return {
			header: null
		};
	};

	saveReview() {
		this.props.createReview(this.props.order.id, this.state.scores);
		this.goBack();
	}

	deleteReview() {
		this.props.deleteReview(this.props.order.id);
		this.goBack();
	}

	goBack() {
		const id = this.props.order.id;
		const onGoBack = this.props.navigation.state.params.onGoBack;
		onGoBack(id);
		this.props.navigation.goBack();
	}

	componentDidMount() {}

	handleRadioButton(quality, score) {
		// const orderId = this.props.order.id;
		this.setState({
			scores: {
				...this.state.scores,
				[quality]: score
			}
		});
	}

	render() {
		return (
			<Overlay
				isVisible={this.state.isVisible}
				onBackdropPress={() => {
					this.setState({ isVisible: false });
					this.props.navigation.navigate('ActiveOrderDetail');
				}}
			>
				<ScrollView
					style={{
						flex: 1,
						flexDirection: 'column',
						backgroundColor: 'white'
					}}
				>
					{/* review */}
					<View style={styles.ratingContainer}>
						<View style={styles.ratingHeaderWrapper}>
							<Text numberOfLines={1} style={styles.ratingTitle}>
								Rating
							</Text>
							{/* <Text numberOfLines={1} style={styles.avgRatingScore}>4.7 / 5</Text> */}
						</View>
						{/* each score title */}
						{this.state.stats.map(val => (
							<View key={val.key} style={styles.ratingContent}>
								<Text numberOfLines={1} style={styles.ratingName}>
									{val.name}
								</Text>
								<View style={styles.scoringContainer}>
									{new Array(5).fill(0).map((v, index) => (
										<View key={index} style={styles.aScoreWrapper}>
											<View style={styles.iconWrapper}>
												<CheckBox
													style={styles.radioBtn}
													onClick={() => {
														this.handleRadioButton(val.key, index + 1);
													}}
													isChecked={this.state.scores[val.key] === index + 1}
													checkBoxColor="#54b33d"
													checkedImage={
														<FontAwesome5
															name={'dot-circle'}
															size={18}
															color={'#54b33d'}
															solid
														/>
													}
													unCheckedImage={
														<FontAwesome5
															name={'circle'}
															size={18}
															color={'#54b33d'}
														/>
													}
												/>
											</View>
											<Text numberOfLines={2} style={styles.iconCaption}>
												{index + 1}
											</Text>
										</View>
									))}
								</View>
							</View>
						))}
						<View style={styles.actionButtonWrapper}>
							<TouchableOpacity
								style={styles.button}
								onPress={() => this.saveReview()}
							>
								<Text style={styles.btnText}>Save</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={styles.button}
								onPress={() => this.deleteReview()}
							>
								<Text style={styles.btnTextSecondary}>Delete</Text>
							</TouchableOpacity>
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
		flex: 1
		// backgroundColor: 'yellow',
	},
	ratingName: {
		fontFamily: 'Quicksand-Medium',
		fontSize: 15,
		padding: 3
	},
	scoringContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center'
	},
	aScoreWrapper: {
		justifyContent: 'center',
		alignItems: 'center',
		padding: 3
		// backgroundColor: 'green',
	},
	iconWrapper: {
		flex: 0,
		justifyContent: 'center',
		alignItems: 'center',
		textAlignVertical: 'center'
		// backgroundColor: 'green'
	},
	icons: {
		// backgroundColor: 'black',
		justifyContent: 'center',
		alignItems: 'center'
	},
	iconCaption: {
		textAlign: 'center',
		fontFamily: 'Quicksand-Medium',
		fontSize: 15
	},
	divider: {
		backgroundColor: '#54b33d',
		height: 0.7
		// marginBottom: 10,
	},
	ratingContainer: {
		flex: 1,
		margin: 5
	},
	ratingHeaderWrapper: {
		flex: 1,
		flexDirection: 'row',
		marginLeft: 10,
		marginRight: 10,
		marginTop: 10,
		padding: 3
	},
	ratingTitle: {
		fontFamily: 'Quicksand-Bold',
		fontSize: 20,
		color: '#54b33d'
	},
	avgRatingScore: {
		fontFamily: 'Quicksand-Medium',
		fontSize: 18,
		marginLeft: 15
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
	actionButtonWrapper: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		margin: 30
	}
});

function initMapStateToProps(state) {
	return {
		order: state.orderReducer.order
	};
}

function initMapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			createReview,
			deleteReview
		},
		dispatch
	);
}

export default connect(
	initMapStateToProps,
	initMapDispatchToProps
)(RatingScreen);
