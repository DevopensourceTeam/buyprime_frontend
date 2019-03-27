import {combineReducers} from 'redux';
import common from './reducers/common';
import video from './reducers/video';
import auth from './reducers/auht';
import cart from './reducers/cart';
import checkout from './reducers/checkout';

export default combineReducers({
	common,
	video,
	auth,
	cart,
	checkout,
});
