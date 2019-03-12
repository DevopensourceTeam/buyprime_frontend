import React from 'react';

import MessageList from './MessageList';

const Messages = (props) => {
	return (
		<section className="h-100">
			{
				props.channel ? <p className="m-0 p-3 border-bottom">{props.channel}</p>
					: <p className="p-3 border-bottom">Load Channel...</p>
			}
			<section className="messagesHeight overflow-auto">{
				props.messages ? props.messages.map((message, i) => {
					return	<section key={i} className="m-3 mb-2 small">
						<MessageList message={message} />
					</section>;
				}) : <p className="m-3 mb-2">Loading Messages...</p>
			}</section>

			<form onSubmit={props.saveMessage}
				className="m-3 justify-content-end nresize">
				<fieldset>
					<textarea
						type="text"
						placeholder="Add Message"
						value={props.message || ''}
						onChange={props.changeInput}
						className="p-2 border rounded small align-top w-100 nresize">
					</textarea>
				</fieldset>
				<button className="mt-2 btn btn-primary float-right" type="submit">
					Chat
				</button>
			</form>
		</section>
	);
};

export default Messages;
