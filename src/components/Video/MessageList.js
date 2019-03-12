import React from 'react';

const MessageList = (props) => {
	return (
		<section>
			<strong>{props.message._sender.nickname}</strong>: {props.message.message}
		</section>
	);
};

export default MessageList;
