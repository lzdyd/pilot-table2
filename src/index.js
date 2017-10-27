import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import {
//   BrowserRouter,
//   Route,
//   Switch
// } from 'react-router-dom';

import App from './containers/App';
import configureStore from './store/configureStore';

import './common/style.scss';

const store = configureStore();

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('root')
);
