import React, { Component } from 'react';
import { FlatList, Image, View } from 'react-native';
import StoreItem from './StoreItem'
import { withNavigation } from 'react-navigation';
class StoreList extends Component{
    renderStoreList = ({ item: store }) => {
        if (store) {
          return (
            <StoreItem
              store={store}
              onPress={() => {
                 this.props.navigation.navigate('Menu')
              }}
            />
          );
        }
        return null;
      };
      
      
      renderStoreSection = () => (        
            <FlatList
              data={this.props.storeList}
              showsHorizontalScrollIndicator={false}
              bounces={false}              
              renderItem={this.renderStoreList}
              keyExtractor={item => item._id}
            />          
      );
      render(){
          return(
              this.renderStoreSection()
          )
      }
}
export default withNavigation(StoreList)