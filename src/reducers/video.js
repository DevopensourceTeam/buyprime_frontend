import {
	CHANGE_HOME_INPUT,
	GET_INFO_CHAT,
	CHANGE_INPUT_CHAT,
	SAVE_MESSAGE,
} from '../constants/actionTypes';

export default (state = {}, action) => {
	switch (action.type) {
	case CHANGE_HOME_INPUT:
		return {
			...state,
			userChat: action.user,
		};
	case GET_INFO_CHAT:
		return {
			...state,
			userSlug: action.payload.userSlug,
			messagesChat: action.payload.messages,
			channelName: action.payload.channel,
		};
	case CHANGE_INPUT_CHAT:
		return {
			...state,
			message: action.message,
		};
	case SAVE_MESSAGE:
		return {
			...state,
			messagesChat: action.payload.messages,
		};
	default:
		return state;
	}
};
