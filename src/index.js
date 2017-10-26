import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
    BrowserRouter,
    Route,
    Switch,
} from 'react-router-dom';

import Home from './containers/Home';
import App from './containers/App';
import configureStore from './store/configureStore';

import './common/style.scss';

const store = configureStore();

ReactDOM.render(
  <Provider store={ store }>
      <BrowserRouter>
          <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/app" component={App} />
          </Switch>
      </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
