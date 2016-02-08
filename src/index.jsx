import React from 'react';
import ReactDOM from 'react-dom';

import {MainPageContainer} from './components/MainPage'

import {createStore, applyMiddleware} from 'redux';
import reducer from './reducer';

import io from 'socket.io-client';

import {sendAudio, setState} from './action_creator';
import middleware from './middleware';

import {Provider} from 'react-redux';

const socket = io("http://localhost:5000");
const createStoreWithMiddleware = applyMiddleware(middleware(socket))(createStore);
const store = createStoreWithMiddleware(reducer);



// Audio API------------

var initalState = {
  isRecording: false,
  switchLabel: "Train",
  buttons: ["Train", "Predict"],
  length: 2048,
  data: {}
}

socket.on('data', data => {
  store.dispatch(data); 
});

store.dispatch(setState(initalState));
console.log(store.getState());



ReactDOM.render(
  <Provider store = {store}>
	<MainPageContainer />
  </Provider>,
  document.getElementById('app')
);