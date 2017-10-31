import { combineReducers } from 'redux';
import excel from './excel';
import doclist from './docList';

export default combineReducers({
  excel,
  doclist
});
