import { combineReducer } from 'redux'
import authReducer from './reducers/authReducer'
import abcReducer from './rootReducer';
import xyzReducer from './rootReducer';


export default combineReducer({
	authReducer,
	abcReducer,
	xyzReducer,
})