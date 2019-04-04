/**
 * @desc Import the constants
 */
import {
	INIT_CHAT,
	CHANGE_INPUT_CHAT,
	SAVE_MESSAGE,
	GET_PRODUCT,
	UNMOUNT_VIDEO,
} from '../constants/actionTypes';

/**
 * @desc Default state from Video.
 */
const defaultState = {
	buttDisabled: true,
	buttAddDisabled: false,
};

export default (state = defaultState, action) => {
	switch (action.type) {
	/**
	 * @desc Get Messages and Channel info from Expressjs
	 */
	case INIT_CHAT:
		if (process.env.REACT_APP_PUBLIC_URL+'/video' !== window.location.href
			&& !action.test) {
			return {
				...state,
			};
		}
		return {
			...state,
			channelName: action.channel,
			channelCover: action.cover,
			messages: [],
			buttDisabled: false,
		};
	/**
	 * @desc When change the value of input in the Chat
	 */
	case CHANGE_INPUT_CHAT:
		return {
			...state,
			message: action.message,
		};
	/**
	 * @desc Messages with new message added
	 */
	case SAVE_MESSAGE:
		state.messages.push(action.message);
		return {
			...state,
			messages: state.messages,
			message: '',
		};
	/**
	 * @desc Save the product to show in Video
	 */
	case GET_PRODUCT:
		return {
			...state,
			productsVideo: action.payload.product,
		};
	/**
	 * @desc Set default data component when unmount
	 */
	case UNMOUNT_VIDEO:
		return {
			...state,
			messages: null,
			channelName: null,
			message: '',
			buttDisabled: true,
		};
	default:
		return state;
	}
};
