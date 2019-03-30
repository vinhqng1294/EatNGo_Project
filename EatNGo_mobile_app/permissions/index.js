import { PermissionsAndroid } from 'react-native';

const requestPermission = async (permission, request) => {
	try {
		return await PermissionsAndroid.request(permission, {
			...request,
			// title: 'Eat&Go Location Permission',
			// message:
			// 	'Eat&Go needs access to your location to show you food shops near you.',
			buttonNeutral: 'Ask Me Later',
			buttonNegative: 'No',
			buttonPositive: 'Grant Access'
		});
	} catch (err) {
		return PermissionsAndroid.RESULTS.DENIED;
	}
};

const getPermission = async (permission, request) => {
	const hasPermission = await PermissionsAndroid.check(permission);
	if (!hasPermission) {
		const granted = await requestPermission(permission, request);
		return granted === PermissionsAndroid.RESULTS.GRANTED;
	}
	return true;
};

export default getPermission;
