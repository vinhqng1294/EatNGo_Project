import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text,
	StatusBar,
	Alert,
	PermissionsAndroid,
	TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { fetchOrdersByStoreId } from '../../../actions/index';
import { bindActionCreators } from 'redux';
import { RNCamera } from 'react-native-camera';
import getPermission from '../../../permissions';

class ScanQRScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			example: undefined,
			isProcessingQR: false
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
		// const captureImages = JSON.stringify(event.captureImages);
		// Alert.alert(
		// 	`${event.type} button pressed`,
		// 	`${captureImages}`,
		// 	[{ text: 'OK', onPress: () => console.log('OK Pressed') }],
		// 	{ cancelable: false }
		// );
	}

	async onReadQR(barcodes) {
		if (!this.isProcessingQR && barcodes.length) {
			this.isProcessingQR = true;
			const json = barcodes[0].data;
			let readSuccessful = false;
			try {
				const data = JSON.parse(json);
				if (data && data.key === 'Eat&Go_Order') {
					readSuccessful = true;
					this.props.navigation.navigate('EmployeeOrderDetail', {
						id: data.orderId
					});
				}
			} catch (e) {}
			if (!readSuccessful) {
				const startProcessingQR = () => {
					setTimeout(() => {
						this.isProcessingQR = false;
					}, 1000);
				};
				Alert.alert(
					'Invalid Eat&Go QR Code',
					'Please make sure to scan a valid order QR code.',
					[
						{
							text: 'OK',
							onPress: startProcessingQR
						}
					],
					{
						onDismiss: startProcessingQR
					}
				);
			}
		}
	}

	render() {
		return (
			<View style={{ flex: 1 }}>
				<StatusBar backgroundColor="#54b33d" barStyle="light-content" />
				<RNCamera
					ref={ref => {
						this.camera = ref;
					}}
					style={styles.preview}
					captureAudio={false}
					type={RNCamera.Constants.Type.back}
					flashMode={RNCamera.Constants.FlashMode.on}
					permissionDialogTitle={'Permission to use camera'}
					permissionDialogMessage={
						'Eat&Go needs access to your camera to scan QR code'
					}
					onGoogleVisionBarcodesDetected={({ barcodes }) =>
						this.onReadQR(barcodes)
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
		backgroundColor: 'black'
	},
	preview: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	capture: {
		flex: 0,
		backgroundColor: '#fff',
		borderRadius: 5,
		padding: 15,
		paddingHorizontal: 20,
		alignSelf: 'center',
		margin: 20
	}
});

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
