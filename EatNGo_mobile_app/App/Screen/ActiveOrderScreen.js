import React, { Component } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Badge, Button } from "react-native-elements";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ActiveOrderItems from "../Components/ActiveOrderItems";
import { fetchOrders } from "../../actions/index";

class ActiveOrderScreen extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   itemList: [
    //     {
    //       id: "#001",
    //       name: "sushi tsunami",
    //       status: "active",
    //       date: "1/18/2019",
    //       time: "3:15PM"
    //     },
    //     {
    //       id: "#002",
    //       name: "1080ti",
    //       status: "active",
    //       date: "1/18/2019",
    //       time: "3:15PM"
    //     }
    //   ]
    // };
  }

  handleItemOnPress(item) {
    this.props.navigation.navigate("ActiveOrderDetail", { id: item.id });
  }

  renderActiveOrderListView = ({ itemList }) => (
    <View style={styles.container}>
      <FlatList
        data={itemList}
        renderItem={({ item }) => (
          <ActiveOrderItems
            id={item.id}
            onPress={this.handleItemOnPress(item)}
            name={item.name}
            // status={item.status}
            date={parseDate(item.date)}
            time={parseTime(item.date)}
          />
        )}
      />
    </View>
  );

  componentDidMount() {
    this.props.fetchOrders();
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.orderList}
          renderItem={({ item }) => (
            <ActiveOrderItems
              id={item.id}
              onPress={() => {
                this.handleItemOnPress(item);
              }}
              name={item.store.name}
              // status={item.status}
              date={parseDate(item.date)}
              time={parseTime(item.date)}
            />
          )}
        />
      </View>
    );
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTintColor: "#54b33d",
      headerStyle: { backgroundColor: "white" },
      headerRight: (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            marginRight: 5
          }}
        >
          <Badge
            value={navigation.getParam("notiValue")}
            status="primary"
            containerStyle={{
              position: "absolute",
              top: -5,
              left: -5,
              zIndex: 10
            }}
          />
          <Button
            icon={
              <FontAwesome5
                name={"receipt"}
                size={23}
                color={"#54b33d"}
                solid
              />
            }
            type="clear"
            title={null}
            onPress={() => {
              navigation.setParams({
                notiValue: navigation.getParam("notiValue") + 1
              });
            }}
          />
        </View>
      ),
      headerLeft: (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            marginLeft: 5
          }}
        >
          <Button
            icon={
              <FontAwesome5
                name={"info-circle"}
                size={23}
                color={"#54b33d"}
                solid
              />
            }
            type="clear"
            title={null}
            onPress={() => {}}
          />
        </View>
      ),
      headerTitle: (
        <View
          style={{
            justifyContent: "center",
            alignItems: "stretch",
            flex: 1
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              fontFamily: "Quicksand-Medium",
              fontSize: 20,
              textAlign: "center",
              color: "#54b33d",
              marginLeft: 10,
              marginRight: 10,
              borderBottomWidth: 0.7,
              borderBottomColor: "#54b33d"
            }}
          >
            Active Orders
          </Text>
        </View>
      )
    };
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchOrders
    },
    dispatch
  );
};

const mapStateToProps = state => {
  return {
    orderList: state.orderReducer.orderList
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveOrderScreen);

function parseDate(str) {
  var date = new Date(Date.parse(str));
  return date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
}

function parseTime(str) {
  var date = new Date(Date.parse(str));
  return date.getHours() + ":" + date.getMinutes();
}
