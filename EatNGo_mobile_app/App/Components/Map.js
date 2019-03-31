import React, { Component } from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { Overlay, CheckBox } from 'react-native-elements';
import MapView, { Marker, Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
const GOOGLE_MAPS_APIKEY = 'AIzaSyCDXBrp0WaDo4gmD2YhvILvgAq4cmLnAv4';

class MapElement extends Component {
	constructor(props) {
		super(props);
		const { latitude, longitude } = { ...props.store };
		this.state = {
			target: {
				latitude,
				longitude
			}
		};
	}
	animateTo(location) {
		if (this.map) {
			this.map.animateToRegion({
				...location,
				latitudeDelta: 0.0622,
				longitudeDelta: 0.0622
			});
		}
	}
	componentDidMount() {
		this.animateTo(this.props.target);
	}
	render() {
		const { target, current, store } = { ...this.props };
		const initialRegion = {
			...target,
			latitudeDelta: 0.0422,
			longitudeDelta: 0.0221
		};
		return (
			<MapView
				ref={ref => {
					this.map = ref;
				}}
				style={styles.map}
				showsUserLocation={true}
				initialRegion={initialRegion}
			>
				<Marker coordinate={target} title={store.name} />
				{current && (
					<Marker pinColor="green" coordinate={current} title="You" />
				)}
				{current && (
					<MapViewDirections
						origin={current}
						destination={target}
						apikey={GOOGLE_MAPS_APIKEY}
						strokeWidth={2}
						strokeColor="green"
					/>
				)}
			</MapView>
		);
	}
}

class Map extends Component {
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
		const { isVisible, onBackdropPress, store } = { ...this.props };
		const target = {
			latitude: store.latitude,
			longitude: store.longitude
		};
		return (
			<View style={{ marginTop: 22 }}>
				<Overlay isVisible={isVisible} onBackdropPress={onBackdropPress}>
					<View style={styles.container}>
						<MapElement
							store={store}
							current={this.state.current}
							target={target}
						/>
					</View>
				</Overlay>
			</View>
		);
	}
}

const mapBorder = 8;
const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: 'flex-end',
		alignItems: 'center',
		padding: 10
	},
	map: {
		position: 'absolute',
		top: mapBorder,
		left: mapBorder,
		right: mapBorder,
		bottom: mapBorder
	}
});
export default Map;
