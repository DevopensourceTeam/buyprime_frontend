import {combineReducers} from 'redux';
import common from './reducers/common';
import video from './reducers/video';
import auth from './reducers/auht';

export default combineReducers({
	common,
	video,
	auth,
});
