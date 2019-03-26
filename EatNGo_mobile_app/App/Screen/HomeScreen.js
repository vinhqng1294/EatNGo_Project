import React, { Component } from 'react';
import { connect } from 'react-redux';
import StoreList from '../Components/StoreList'
import { Overlay, Button } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { fetchStore, fetchMoreStores, searchStore } from '../../actions/index'
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TouchableOpacity
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { SearchBar } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';

class HomeScreen extends Component {
    constructor(props) {
        super(props)
    }
    static navigationOptions = ({ navigation }) => {
        return {
            headerTintColor: 'white',
            headerStyle: { backgroundColor: '#54b33d' },
            headerRight: null,
            headerLeft: null,
            headerTitle:
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'stretch',
                    flex: 1,
                    // backgroundColor: 'yellow',
                }}>
                    <SearchBar
                        value={navigation.getParam('searchValue')}
                        placeholder='Search for restaurants '
                        placeholderTextColor='rgba(255,255,255,.4)'
                        searchIcon={<FontAwesome5 name={'search'} size={15} color={'white'} solid />}
                        containerStyle={{
                            backgroundColor: '#54b33d',
                        }}
                        inputContainerStyle={{
                            backgroundColor: 'rgba(0, 0, 0, .25)',
                        }}
                        inputStyle={{
                            // backgroundColor: 'black',
                            fontFamily: 'Quicksand-Medium',
                            fontSize: 15,
                            textAlignVertical: 'center',
                            color: 'white',
                        }}
                        onChangeText={(value) => {
                            navigation.setParams({ searchValue: value })
                            let handleSearch = navigation.getParam('handleSearch')
                            handleSearch(value)
                        }} />
                </View>
        }

    };



    componentDidMount() {
        const { storeList } = this.props;
        if (!storeList || !storeList.length) {
            this.props.fetchStore();
        }

        this.props.navigation.setParams({
            searchValue: '',
            handleSearch: this.handleSearch.bind(this)
        });
    }

    handleSearch(value) {
        this.props.searchStore(value)
    }
    render() {

        return (
            <View style={styles.container}>

                <StatusBar style={{
                }} backgroundColor="#54b33d" barStyle="light-content" />
                <StoreList
                    extraData={this.props}
                    onEndReached={this.props.fetchMoreStores}
                    isLoadingOrders={this.props.isLoadingOrders}
                    storeList={this.props.storeList}
                    fetchStore={this.props.fetchStore} />
            </View>

        );
    }
}
const mapStateToProps = (state) => {
    return {
        storeList: state.storeReducer.filteredStoreList,        
        isLoadingOrders: state.storeReducer.isLoadingOrders,
        isLoadingMoreStores: state.storeReducer.isLoadingMoreStores
    }
    // return {
    //     storeList: state.authReducer.registerMessage,
    // }
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#EBEBEB',
    }
});
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        fetchStore,
        searchStore,
        fetchMoreStores
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);


