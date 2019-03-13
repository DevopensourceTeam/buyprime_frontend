/* eslint-disable */
let router = require('express').Router();
let SendBird = require('sendbird');
let sb = new SendBird({appId: '189DF08F-9C2D-416B-B2D8-405204D26B4F'});


getChannel = async () => {
    return new Promise((resolve) => {
        sb.OpenChannel.getChannel('devopensource', (channel, error) => {
            if(error)
                console.log(error);

            resolve(channel);
        })
    })
}

router.post('/newMessage', async (req, res, next) => {
    sb.connect(req.body.user, (user, error) => {
        if (error) {
            return;
        }
    });

    let openChannel = await getChannel();

    openChannel.enter((response, error) => {
        if (error) {
            return;
        }
    });

    openChannel.sendUserMessage(req.body.message, (message, error) => {
        if (error) {
            return;
        }
    });

    let messageListQuery = openChannel.createPreviousMessageListQuery();
    messageListQuery.limit = 10;
    messageListQuery.reverse = true;
    
    messageListQuery.load((messageList, error) => {
        if (error) {
            return;
        }

        return res.status(200).json({userSlug: req.body.userSlug, messages: messageList, channel: openChannel.name});
    });
});

router.post('/initChannel', async (req, res, next) => {
    var user = req.body.user.user;
    var userSlug = req.body.user.userSlug;

    sb.connect(userSlug, (user, error) => {
        if (error) {
            return;
        }
    });
    
    sb.updateCurrentUserInfo(user, '', (response, error) => {
        if(error) {
            return;
        }   
    });
    
    let openChannel = await getChannel();
    
    openChannel.enter((response, error) => {
        if (error) {
            return;
        }
    });

    let messageListQuery = openChannel.createPreviousMessageListQuery();
    messageListQuery.limit = 10;
    messageListQuery.reverse = true;
    
    messageListQuery.load((messageList, error) => {
        if (error) {
            return;
        }

        return res.status(200).json({userSlug: userSlug, messages: messageList, channel: openChannel.name});
    });
});

router.post('/disconnect', async (req, res, next) => {
    let openChannel = await getChannel();
    
    openChannel.exit(function(response, error){
        if (error) {
            return;
        }

        res.json({state: true});
    });
});

module.exports = router;