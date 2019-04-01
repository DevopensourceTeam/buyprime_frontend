/**
 * @constant asynchat
 */
export const asynchat = {
	/**
	 * @function connect
	 * @desc Connect to SendBird server and edit the user
	 * @param {String} nickname
	 * @param {String} email
	 * @param {Object} sb
	 * @return {Promise}
	 */
	connect: (nickname, email, sb) => {
		return new Promise((resolve) => {
			sb.connect(email,
				(user, error) => {
					if (error) {
						return;
					}

					if (!user.nickname) {
						sb.updateCurrentUserInfo(nickname, '', (response, error) => {
							if (error) {
								return;
							};
						});
					}
					resolve(true);
				});
		});
	},
	/**
	 * @function getChannel
	 * @desc Get channel and enter
	 * @param {Object} sb
	 * @param {Function} initChat
	 * @param {Object} that
	 * @return {Promise}
	 */
	getchannel: (sb, initChat, that) => {
		return new Promise((resolve) => {
			sb.OpenChannel.getChannel('devopensource', (channel, error) => {
				if (error) {
					return;
				}
				that.openChannel = channel;

				channel.enter(function(response, error) {
					if (error) {
						return;
					}

					initChat(channel.name, channel.coverUrl);
				});
			});

			resolve(true);
		});
	},
	/**
	 * @function messagereceived
	 * @desc When the chat detect a new message save in the store
	 * @param {Object} channel
	 * @param {Function} saveMessage
	 * @param {Object} that
	 * @return {Promise}
	 */
	messagereceived: (channel, saveMessage, that) => {
		return new Promise((resolve) => {
			channel.onMessageReceived = (channel, message) => {
				saveMessage(message);
				that.setState({reaload: true});
			};

			resolve(true);
		});
	},
	/**
	 * @function exit
	 * @desc Exit of the channel of the SendBird
	 * @param {Object} channel
	 * @return {Promise}
	 */
	exit: (channel) => {
		return new Promise((resolve) => {
			channel.exit((response, error) => {
				if (error) {
					return;
				}
			});

			resolve(true);
		});
	},
};
