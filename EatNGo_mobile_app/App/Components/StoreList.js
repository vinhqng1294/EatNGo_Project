import React, { Component } from 'react';
import { FlatList, Image, View } from 'react-native';
import StoreItem from './StoreItem'
import { withNavigation } from 'react-navigation';

class StoreList extends Component {
  renderStoreList = ({ item: store }) => {
    if (store) {
      return (
        <StoreItem
          store={store}
          onPress={() => {
            this.props.navigation.navigate('Menu', { store: store })
          }}
        />
      );
    }
    return null;
  };


  renderStoreSection = () => (
    <FlatList
      data={this.props.storeList}
      onEndReached={this.props.onEndReached}
      onEndReachedThreshold={0.1}
      refreshing={this.props.isLoadingOrders}
      onRefresh={() => {
        this.props.fetchStore();
      }}
      showsHorizontalScrollIndicator={true}
      renderItem={this.renderStoreList}
      keyExtractor={item => item.id}
    />
  );
  render() {
    return (
      this.renderStoreSection()
    )
  }
}
export default withNavigation(StoreList)