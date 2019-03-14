/**
 * @desc Import the constants
 */
import {
	CHANGE_HOME_INPUT,
	INIT_CHAT,
	CHANGE_INPUT_CHAT,
	SAVE_MESSAGE,
	UNMOUNT_VIDEO,
} from '../constants/actionTypes';

/**
 * @desc Default state from Video.
 */
const defaultState = {
	buttDisabled: true,
};

export default (state = defaultState, action) => {
	switch (action.type) {
	/**
	 * @desc When change the value of input in the Home
	 */
	case CHANGE_HOME_INPUT:
		return {
			...state,
			userChat: action.user,
			userSlug: action.user.toLowerCase().replace(' ', '-'),
		};
	/**
	 * @desc Get Messages and Channel info from Expressjs
	 */
	case INIT_CHAT:
		return {
			...state,
			channelName: action.channel,
			messages: [],
			buttDisabled: false,
		};
	/**
	 * @desc When change the value of input in the Home
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
