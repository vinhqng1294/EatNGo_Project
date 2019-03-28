import React, { Component } from 'react';
import {
    Alert
} from 'react-native';
import { CameraKitCameraScreen } from 'react-native-camera-kit';
import CheckingScreen from './CheckingScreen';


export default class ScanQRScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            example: undefined
        };
    }

    onBottomButtonPressed(event) {
        const captureImages = JSON.stringify(event.captureImages);
        Alert.alert(
            `${event.type} button pressed`,
            `${captureImages}`,
            [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false }
        )
    }

    render() {
        if (this.state.example) {
            const CameraScreen = this.state.example;
            return <CameraScreen />;
        }
        return (
            <CameraKitCameraScreen
                actions={{ rightButtonText: 'Done', leftButtonText: 'Cancel' }}
                onBottomButtonPressed={(event) => this.onBottomButtonPressed(event)}
                flashImages={{
                    on: require('../../../Assets/google.png'),
                    off: require('../../../Assets/facebook.png'),
                    auto: require('../../../Assets/mobile.png')
                }}
                showFrame={true}
                scanBarcode={true}
                laserColor={"blue"}
                frameColor={"yellow"}

                //onReadCode={((event) => Alert.alert(`Qr code found ${event.nativeEvent.codeStringValue} `))} 
                onReadCode={((event) => this.setState({ example: CheckingScreen }))}
                hideControls={true}
                // offsetForScannerFrame = {10}  
                // heightForScannerFrame = {300}  
                colorForScannerFrame={'blue'}
            />
        );
    }
}
