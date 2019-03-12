import React from 'react';

/**
 * @constant MessageList
 * @param {Object} props
 * @return {JSX}
 */
const MessageList = (props) => {
	return (
		<section>
			<strong>{props.message._sender.nickname}</strong>: {props.message.message}
		</section>
	);
};

export default MessageList;
