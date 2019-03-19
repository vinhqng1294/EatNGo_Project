import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Text, Image, ToastAndroid, TouchableOpacity } from 'react-native';
import { ListItem, Button, Icon } from 'react-native-elements';


export default class ProfileScreen extends Component {

    constructor(props) {
        super(props);
        this.renderOptions = this.renderOptions.bind(this);
    }

    renderContactHeader = () => {

        return (
            <View style={styles.headerContainer}>
                <View style={styles.userRow}>
                    <Image
                        style={styles.userImage}
                        source={{
                            uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
                        }}
                    />
                    <View style={styles.userNameRow}>
                        <Text style={styles.userNameText}>Vu Huynh</Text>
                    </View>
                    <View style={styles.userBioRow}>
                        <Text style={styles.userBioText}>vuhuynhhoan@gmail.com</Text>
                    </View>
                </View>
                <View style={styles.socialRow}>
                    <View>
                        <Icon
                            size={30}
                            type="entypo"
                            color="#3B5A98"
                            name="facebook-with-circle"
                            onPress={() => ToastAndroid.show("facebook", ToastAndroid.SHORT)}
                        />
                    </View>
                    <View style={styles.socialIcon}>
                        <Icon
                            size={30}
                            type="entypo"
                            color="#56ACEE"
                            name="twitter-with-circle"
                            onPress={() => ToastAndroid.show("twitter", ToastAndroid.SHORT)}
                        />
                    </View>
                    <View>
                        <Icon
                            size={30}
                            type="entypo"
                            color="#DD4C39"
                            name="google--with-circle"
                            onPress={() => ToastAndroid.show("google", ToastAndroid.SHORT)}
                        />
                    </View>
                </View>
            </View>
        )
    }

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "86%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "14%"
                }}
            />
        );
    };

    renderOptions = () => {
        return (
            list.map((item, i) => (
                <ListItem
                    renderSeparator={this.renderSeparator}
                    key={i}
                    title={item.title}
                    leftIcon={{ name: item.icon }}
                    onPress={() => this.onPressOption(item.title)}
                />
            ))
        )
    }

    onPressOption(title) {
        switch (title) {
            case 'Settings':
                this.props.navigation.navigate('EditProfile')
        }
    }

    render() {
        return (
            <ScrollView style={styles.scroll}>
                <View style={styles.container}>
                    <View style={styles.cardContainer}>
                        {this.renderContactHeader()}
                    </View>
                </View>

                <View>
                    {this.renderOptions()}
                </View>

                <Button
                    title="Logout"
                    buttonStyle={styles.logoutButton}
                    onPress={this.clickToLogout}
                />
                <View style={styles.footerInfo}>
                    <Text style={styles.version}>Version 0.0.1</Text>
                    <Text style={styles.version}>A ENG Corporation</Text>
                </View>
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    version: { fontFamily: "vincHand", fontSize: 13 },
    footerInfo: { flex: 1, alignItems: 'center', marginTop: 20 },
    logoutButton: { backgroundColor: '#54C242' },
    cardContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    headerContainer: {
        alignItems: 'center',
        backgroundColor: '#FFF',
        marginBottom: 10,
        marginTop: 45,
    },
    indicatorTab: {
        backgroundColor: 'transparent',
    },
    scroll: {
        backgroundColor: '#FFF',
    },
    sceneContainer: {
        marginTop: 10,
    },
    socialIcon: {
        marginLeft: 14,
        marginRight: 14,
    },
    socialRow: {
        flexDirection: 'row',
    },
    tabBar: {
        backgroundColor: '#EEE',
    },
    tabContainer: {
        flex: 1,
        marginBottom: 12,
    },
    tabLabelNumber: {
        color: 'gray',
        fontSize: 12.5,
        textAlign: 'center',
    },
    tabLabelText: {
        color: 'black',
        fontSize: 22.5,
        fontWeight: '600',
        textAlign: 'center',
    },
    userBioRow: {
        marginLeft: 40,
        marginRight: 40,
    },
    userBioText: {
        color: 'gray',
        fontSize: 13.5,
        textAlign: 'center',
    },
    userImage: {
        borderRadius: 60,
        height: 120,
        marginBottom: 10,
        width: 120,
    },
    userNameRow: {
        marginBottom: 10,
    },
    userNameText: {
        color: '#5B5A5A',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    userRow: {
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        marginBottom: 12,
    },
})

const list = [
    {
        title: 'History',
        icon: 'history'
    },
    {
        title: 'Favorite',
        icon: 'favorite'
    },
    {
        title: 'Payment',
        icon: 'payment'
    },
    {
        title: 'Address',
        icon: 'add-location'
    },
    {
        title: 'Settings',
        icon: 'settings'
    }
]