import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import convert from '../modules/convert';

export default combineReducers({
  form,
  convert,
});
