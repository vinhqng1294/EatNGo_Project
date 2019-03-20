import React, { Component } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const ActiveOrderItems = ({ id, name, status, date, time, onPress }) => (
    <View style={styles.container}>
        <View style={styles.container_text}>
            <Text style={styles.title}>{id}</Text>
            <Text style={styles.description}>{name}</Text>
            <Text style={styles.description}>{status}</Text>
            <Button
                icon={<Icon name="arrow-right" size={15} color="white"  />}
                iconRight
                onPress={onPress}
                title="View Order"
                color="#54C242"
            />
        </View>

        <View style={styles.container_date}>
            <Text style={styles.description}>{date}</Text>
            <Text style={styles.description}>{time}</Text>
            <Icon
                raised
                name='trash-o'
                type='font-awesome'
                color='#f50'
                size={30}
                style={{ paddingTop: 20 }}
                onPress={() => console.log('hello')} />
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        padding: 10,
        marginLeft: 16,
        marginRight: 16,
        marginTop: 8,
        marginBottom: 8,
        borderRadius: 5,
        backgroundColor: "#C7D6DF",
        justifyContent: "space-between"
    },
    title: {
        fontSize: 16,
        color: "#000"
    },
    container_text: {
        marginLeft: 12,
        justifyContent: "center"
    },
    container_date: {
        marginLeft: 12,
        justifyContent: "flex-end",
        paddingTop: 10
    },

    description: {
        fontSize: 14,
        fontStyle: "italic"
    }
});

export default ActiveOrderItems;