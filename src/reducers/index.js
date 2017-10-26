import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import excel from './excel';

export default combineReducers({
  excel,
  routing: routerReducer
});
