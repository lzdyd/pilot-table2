import { combineReducers } from 'redux';
import excel from './excel';
import DocList from './DocListReducer';

export default combineReducers({
  excel,
  DocList
});
