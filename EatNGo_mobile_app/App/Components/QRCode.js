import React, { Component } from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { Overlay, CheckBox } from 'react-native-elements';
import QRCode from 'react-native-qrcode';

class QRCodeModal extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	async componentDidMount() {
		const json = await AsyncStorage.getItem('location');
		const currentLocation = json && JSON.parse(json);
		this.setState({
			current: currentLocation
		});
	}
	render() {
		const { isVisible, onBackdropPress, order } = { ...this.props };
		return (
			<View style={{ marginTop: 22 }}>
				<Overlay isVisible={isVisible} onBackdropPress={onBackdropPress}>
					<View style={styles.container}>
						<QRCode
							value={JSON.stringify({
								key: 'Eat&Go_Order',
								orderId: order.id,
								storeId: order.storeId
							})}
							size={300}
							bgColor="black"
							fgColor="white"
						/>
					</View>
				</Overlay>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
        padding: 10
	}
});
export default QRCodeModal;
