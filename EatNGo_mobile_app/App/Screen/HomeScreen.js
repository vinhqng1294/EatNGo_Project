import React, { Component } from 'react';
import { connect } from 'react-redux';
import StoreList from '../Components/StoreList'
import { bindActionCreators } from 'redux';
import { fetchStore } from '../../actions/index'
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { SearchBar, Icon } from 'react-native-elements';

class HomeScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerTintColor: 'white',
            headerStyle: { backgroundColor: '#54b33d' },
            // headerRight: <View></View>,
            // headerLeft: <View></View>,
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
                        onChangeText={(value) => {navigation.setParams({searchValue: value})}} />
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
        });
    }

    render() {
        return (
            <ScrollView style={styles.container}>

                <StoreList storeList={this.props.storeList} />
            </ScrollView>
        );
    }
}
const mapStateToProps = (state) => {
    console.log(state)
    return {
        storeList: state.storeReducer.storeList
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
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);


