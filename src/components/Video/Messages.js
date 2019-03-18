import React from 'react';

import MessageList from './MessageList';

/**
 * @constant Messages
 * @param {Object} props
 * @return {JSX}
 */
const Messages = (props) => {
	return (
		<section className="h-100">
			{
				props.channel ?
					<section className="d-flex align-items-center p-2 border-bottom">
						<img className="m-3 pr-0 chatImage" src={props.cover}
							alt="logo channel"/>
						<p className="m-0 p-3">{props.channel}</p>
					</section>
					: <p className="p-3 border-bottom">Load Channel...</p>
			}
			<section className="messagesHeight overflow-auto">{
				props.messages ?
					props.messages.map((message, i) => {
						return	<section key={i} className="m-3 mb-2 small">
							<MessageList message={message} />
						</section>;
					}) :
					<section
						className="h-100 d-flex justify-content-center
							align-items-center">
						<label className="lds-dual-ring"></label>
					</section>
			}</section>

			<form onSubmit={props.saveMessage}
				className="m-3 justify-content-end nresize">
				<fieldset>
					<textarea
						required
						type="text"
						placeholder="Add Message"
						value={props.message || ''}
						onChange={props.changeInput}
						className="p-2 border rounded small align-top w-100 nresize">
					</textarea>
				</fieldset>
				<button
					className="mt-2 btn btn-primary float-right"
					type="submit"
					disabled={props.buttDisabled}>
					Chat
				</button>
			</form>
		</section>
	);
};

export default Messages;
