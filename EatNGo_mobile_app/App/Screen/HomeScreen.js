import React, { Component } from 'react';
import { connect } from 'react-redux';
import StoreList from '../Components/StoreList'
import { bindActionCreators } from 'redux';
import { fetchStore } from '../../actions/index'
import {
    StyleSheet,
    ScrollView,
} from 'react-native';

class HomeScreen extends Component {
    componentDidMount() {
        const { storeList } = this.props
        if (!storeList || !storeList.length) {
            this.props.fetchStore()
        }
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


