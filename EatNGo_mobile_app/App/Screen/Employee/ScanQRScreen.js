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
	Alert,
	Image,
	Dimensions,
	TextInput
} from 'react-native';
import { CameraKitCameraScreen } from 'react-native-camera-kit';
import { connect } from 'react-redux';
import { fetchOrdersByStoreId } from '../../../actions/index';
import { bindActionCreators } from 'redux';

class ScanQRScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			example: undefined
		};
	}

	static navigationOptions = ({ navigation }) => {
		return {
			headerTintColor: '#54b33d',
			headerStyle: { backgroundColor: 'white' },
			headerRight: <View />,
			headerLeft: <View />,
			headerTitle: (
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
							marginLeft: 50,
							marginRight: 50,
							borderBottomWidth: 0.7,
							borderBottomColor: '#54b33d'
						}}
					>
						Scan QR Code
					</Text>
				</View>
			)
		};
	};

	onBottomButtonPressed(event) {
		const captureImages = JSON.stringify(event.captureImages);
		Alert.alert(
			`${event.type} button pressed`,
			`${captureImages}`,
			[{ text: 'OK', onPress: () => console.log('OK Pressed') }],
			{ cancelable: false }
		);
	}

	onReadQR(event) {
		const json = event.nativeEvent.codeStringValue;
		const data = JSON.parse(json);
		if (data.key === 'Eat&Go_Order') {
			this.props.navigation.navigate('EmployeeOrderDetail', {
				id: data.orderId,
				onGoBack: () => this.props.fetchOrdersByStoreId(data.storeId)
			});
		}
	}

	render() {
		if (this.state.example) {
			const CameraScreen = this.state.example;
			return <CameraScreen />;
		}
		return (
			<View style={{ flex: 1 }}>
				<StatusBar backgroundColor="#54b33d" barStyle="light-content" />
				<CameraKitCameraScreen
					actions={{ rightButtonText: 'Done', leftButtonText: 'Cancel' }}
					onBottomButtonPressed={event => this.onBottomButtonPressed(event)}
					scanBarcode={true}
					laserColor={'blue'}
					frameColor={'yellow'}
					onReadQRCode={e => this.onReadQR(e)} //optional
					hideControls={false} //(default false) optional, hide buttons and additional controls on top and bottom of screen
					showFrame={true} //(default false) optional, show frame with transparent layer (qr code or barcode will be read on this area ONLY), start animation for scanner,that stoped when find any code. Frame always at center of the screen
					offsetForScannerFrame={10} //(default 30) optional, offset from left and right side of the screen
					heightForScannerFrame={300} //(default 200) optional, change height of the scanner frame
					colorForScannerFrame={'red'} //(default white) optional, change colot of the scanner frame
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({});

const mapDispatchToProps = dispatch => {
	return bindActionCreators(
		{
			fetchOrdersByStoreId
		},
		dispatch
	);
};

export default connect(
	null,
	mapDispatchToProps
)(ScanQRScreen);
