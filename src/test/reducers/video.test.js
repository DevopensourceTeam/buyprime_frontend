/**
 * @desc Import Redcuer
 */
import video from '../../reducers/video';

/**
 * @desc Import action types
 */
import {
	INIT_CHAT,
	CHANGE_INPUT_CHAT,
	SAVE_MESSAGE,
	GET_PRODUCT,
	UNMOUNT_VIDEO,
} from '../../constants/actionTypes';

describe('Video Reducer', () => {
	it('Video initial state', () => {
		expect(video(undefined, {
			buttDisabled: true,
			buttAddDisabled: false,
		})).toEqual({
			buttDisabled: true,
			buttAddDisabled: false,
		});
	});

	it('Video INIT_CHAT', () => {
		expect(video({}, {
			type: INIT_CHAT,
			channel: 'Devopensource',
			cover: 'Cover',
			test: true,
		})).toEqual({
			channelName: 'Devopensource',
			channelCover: 'Cover',
			messages: [],
			buttDisabled: false,
		});

		expect(video({}, {
			type: INIT_CHAT,
			channel: 'Devopensource',
			cover: 'Cover',
			test: false,
		})).toEqual({});
	});

	it('Video CHANGE_INPUT_CHAT', () => {
		expect(video({}, {
			type: CHANGE_INPUT_CHAT,
			message: 'message',
		})).toEqual({
			message: 'message',
		});
	});

	it('Video SAVE_MESSAGE', () => {
		expect(video({
			messages: [],
		}, {
			type: SAVE_MESSAGE,
			message: 'message1',
		})).toEqual({
			messages: ['message1'],
			message: '',
		});
	});

	it('Video GET_PRODUCT', () => {
		expect(video({}, {
			type: GET_PRODUCT,
			payload: {
				product: ['producto1', 'producto2'],
			},
		})).toEqual({
			productsVideo: ['producto1', 'producto2'],
		});
	});

	it('Video UNMOUNT_VIDEO', () => {
		expect(video({}, {
			type: UNMOUNT_VIDEO,
			payload: {
				product: ['producto1', 'producto2'],
			},
		})).toEqual({
			messages: null,
			channelName: null,
			message: '',
			buttDisabled: true,
		});
	});
});
