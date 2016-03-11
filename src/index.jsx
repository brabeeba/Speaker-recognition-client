import React from 'react';
import ReactDOM from 'react-dom';

import Router, {Route} from 'react-router';

import App from './components/App';

import {MainPageContainer} from './components/MainPage'
import {MessageViewContainer} from './components/MessageView'

import {createStore, applyMiddleware} from 'redux';
import reducer from './reducer';

import io from 'socket.io-client';

import {sendAudio, setState} from './action_creator';
import middleware from './middleware';

import {Provider} from 'react-redux';

const socket = io("http://140.247.178.146:8000");
const createStoreWithMiddleware = applyMiddleware(middleware(socket))(createStore);
const store = createStoreWithMiddleware(reducer);



// Audio API------------

var initalState = {
  isRecording: false,
  switchLabel: "Train",
  buttons: ["Train", "Predict"],
  length: 2048,
  page: 1,
  data: {},
  meetingOne: false
}

socket.on('data', data => {
  store.dispatch(data); 
});

store.dispatch(setState(initalState));
console.log(store.getState());

const routes = 
<Route component={App}>
  <Route path="/message" component={MessageViewContainer} />
  <Route path="/" component={MainPageContainer} />
</Route>;

ReactDOM.render(
  <Provider store = {store}>
	<Router>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);