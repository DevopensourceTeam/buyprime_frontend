/**
 * @desc Import the constants
 */
import {
	CHANGE_HOME_INPUT,
	GET_INFO_CHAT,
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
		};
	/**
	 * @desc Get Messages and Channel info from Expressjs
	 */
	case GET_INFO_CHAT:
		return {
			...state,
			userSlug: action.payload.userSlug,
			messagesChat: action.payload.messages,
			channelName: action.payload.channel,
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
		return {
			...state,
			messagesChat: action.payload.messages,
			message: '',
		};
	case UNMOUNT_VIDEO:
		return {
			...state,
			messagesChat: null,
			channelName: null,
			buttDisabled: true,
		};
	default:
		return state;
	}
};
