export const asynchat = {
	connect: (nickname, email, sb) => {
		return new Promise((resolve) => {
			sb.connect(email,
				(user, error) => {
					if (error) {
						return;
					}
				});

			sb.updateCurrentUserInfo(nickname, '', (response, error) => {
				if (error) {
					return;
				};
			});

			resolve(true);
		});
	},
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
	messagereceived: (channel, saveMessage, that) => {
		return new Promise((resolve) => {
			channel.onMessageReceived = (channel, message) => {
				saveMessage(message);
				that.setState({reaload: true});
			};

			resolve(true);
		});
	},
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
