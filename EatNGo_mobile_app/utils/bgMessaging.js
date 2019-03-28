import firebase from 'react-native-firebase';
// Optional flow type
import type { RemoteMessage } from 'react-native-firebase';

export default async (message: RemoteMessage) => {
    // handle your message
    const channel = new firebase.notifications.Android.Channel(
        'test-channel',
        'Channel Name',
        firebase.notifications.Android.Importance.Max
    ).setDescription('A natural description of the channel');
    firebase.notifications().android.createChannel(channel);
    const notification = new firebase.notifications.Notification({
        sound: 'default',
    }).setTitle('EatNGo')
        .setBody(message.data.type === 'HAS_NEW_ORDER' ? 'You have new order' : `Your order #${message.data.orderId} is ${getStatusString(message.data.type)}`)
        .setData(message.data)
        .android.setChannelId('test-channel')
        .android.setSmallIcon('ic_launcher')
        .android.setPriority(firebase.notifications.Android.Priority.High);

    firebase.notifications()
        .displayNotification(notification)
        .catch(err => console.error(err));

    return Promise.resolve();
}

const getStatusString = (status) => {
    switch (status) {
        case "ORDER_COMPLETED":
            return 'completed';
        case "ORDER_REJECTED":
            return 'rejected';
        default:
            return '';
    }
}