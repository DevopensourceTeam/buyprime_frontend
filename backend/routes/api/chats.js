/* eslint-disable */
let router = require('express').Router();
let SendBird = require('sendbird');
let sb = new SendBird({appId: '189DF08F-9C2D-416B-B2D8-405204D26B4F'});

router.get('/:user', (req, res, next) => {
    const user = JSON.parse(req.params.user);

    sb.connect(user.userSlug, (user, error) => {
        if (error) {
            return;
        }
    });

    /* sb.OpenChannel.createChannel('DevOpenSource', (channel, error) => {
        if (error) {
            return;
        }
    
        channel.enter((response, error) => {
            if (error) {
                return;
            }
        });
    }); */

    sb.updateCurrentUserInfo(user.user, '', (response, error) => {
        if(error) {
            return;
        }   
    });

    sb.OpenChannel.getChannel('devopensource', (channel, error) => {
        if (error) {
            return;
        }
    
        channel.enter((response, error) => {
            if (error) {
                return;
            }
        });

        let messageListQuery = channel.createPreviousMessageListQuery();
        messageListQuery.limit = 10;
        messageListQuery.reverse = true;

        messageListQuery.load((messageList, error) => {
            if (error) {
                return;
            }
            return res.status(200).json({userSlug: user.userSlug, messages: messageList, channel: channel.name});
        });
    });
});

router.post('/', (req, res, next) => {
    sb.connect(req.body.user, (user, error) => {
        if (error) {
            return;
        }
    });

    sb.OpenChannel.getChannel('devopensource', (channel, error) => {
        if (error) {
            return;
        }

        channel.enter((response, error) => {
            if (error) {
                return;
            }
        });

        channel.sendUserMessage(req.body.message, (message, error) => {
            if (error) {
                return;
            }

        });

        let messageListQuery = channel.createPreviousMessageListQuery();
        messageListQuery.limit = 10;
        messageListQuery.reverse = true;

        messageListQuery.load((messageList, error) => {
            if (error) {
                return;
            }

            return res.status(200).json({messages: messageList});
        });
    });
});

router.post('/disconnect', (req, res, next) => {
    sb.OpenChannel.getChannel('devopensource', function (channel, error) {
        if (error) {
            return;
        }
    
        channel.exit(function(response, error){
            if (error) {
                return;
            }
        });
    });

    res.json({state: true});
});

module.exports = router;