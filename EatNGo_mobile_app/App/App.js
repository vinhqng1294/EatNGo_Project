

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Navigation from './Router'
import allReducers from '../reducers/index';
//Redux saga
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';
const sagaMiddleware = createSagaMiddleware();
let store = createStore(allReducers, applyMiddleware(sagaMiddleware));

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}
sagaMiddleware.run(rootSaga);
