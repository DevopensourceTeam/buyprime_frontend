import React from 'react';

/**
 * @function MessageList
 * @param {Object} props
 * @return {JSX}
 */
const MessageList = (props) => {
	/**
	 * @function stringToColour
	 * @desc Convert the id of the user in a colour
	 * @param {String} str
	 * @return {String}
	 */
	const stringToColour = (str) => {
		let hash = 0;
		for (let i = 0; i < str.length; i++) {
			hash = str.charCodeAt(i) + ((hash << 5) - hash);
		}
		let colour = '#';
		for (let i = 0; i < 3; i++) {
			const value = (hash >> (i * 8)) & 0xFF;
			colour += ('00' + value.toString(16)).substr(-2);
		}
		return colour;
	};

	/**
	 * @constant style
	 * @desc Style to include in JSX to make change the colour
	 */
	const style = {
		color: stringToColour(props.message._sender.userId),
	};

	return (
		<section>
			<strong style={style}>{props.message._sender.nickname}</strong>
			: {props.message.message}
		</section>
	);
};

export default MessageList;
