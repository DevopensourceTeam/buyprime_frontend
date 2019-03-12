/* eslint-disable */
let router = require('express').Router();
let SendBird = require('sendbird');
let sb = new SendBird({appId: '189DF08F-9C2D-416B-B2D8-405204D26B4F'});

router.get('/:user', (req, res, next) => {
    sb.connect(req.params.user, function(user, error) {
        if (error) {
            return;
        }
    });

    /* sb.OpenChannel.createChannel('DevOpenSource', function(channel, error) {
        if (error) {
            return;
        }
    
        channel.enter(function(response, error) {
            if (error) {
                return;
            }
        });
    }); */

    sb.OpenChannel.getChannel('devopensource', function(channel, error) {
        if (error) {
            return;
        }
    
        channel.enter(function(response, error) {
            if (error) {
                return;
            }
        });

        let messageListQuery = channel.createPreviousMessageListQuery();
        messageListQuery.limit = 10;
        messageListQuery.reverse = true;

        messageListQuery.load(function(messageList, error){
            if (error) {
                return;
            }
            return res.status(200).json({userSlug: req.params.user, messages: messageList, channel: channel.name});
        });
    });
});

router.post('/', (req, res, next) => {
    sb.connect(req.body.user, function(user, error) {
        if (error) {
            return;
        }
    });

    sb.OpenChannel.getChannel('devopensource', function(channel, error) {
        if (error) {
            return;
        }

        channel.enter(function(response, error) {
            if (error) {
                return;
            }
        });

        channel.sendUserMessage(req.body.message, function(message, error) {
            if (error) {
                return;
            }

        });

        let messageListQuery = channel.createPreviousMessageListQuery();
        messageListQuery.limit = 10;
        messageListQuery.reverse = true;

        messageListQuery.load(function(messageList, error){
            if (error) {
                return;
            }

            return res.status(200).json({messages: messageList});
        });
    });
});

module.exports = router;