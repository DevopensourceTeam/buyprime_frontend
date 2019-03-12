import {combineReducers} from 'redux';
import common from './reducers/common';
import video from './reducers/video';

export default combineReducers({
	common,
	video,
});
