import React, { Component } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ActiveOrderItems from "../Components/ActiveOrderItems";

class ActiveOrderScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemList: [
        {
          id: "#001",
          name: "sushi tsunami",
          status: "active",
          date: "1/18/2019",
          time: "3:15PM"
        },
        {
          id: "#002",
          name: "1080ti",
          status: "active",
          date: "1/18/2019",
          time: "3:15PM"
        }
      ]
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <ActiveOrderListView itemList={this.state.itemList} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

const mapStateToProps = state => {
  console.log(state);
  return {
    storeList: state.storeReducer.storeList
  };
};

const ActiveOrderListView = ({ itemList }) => (
  <View style={styles.container}>
    <FlatList
      data={itemList}
      renderItem={({ item }) => (
        <ActiveOrderItems id={item.id} name={item.name} status={item.status} date={item.date} time={item.time} />
      )}
    />
  </View>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveOrderScreen);