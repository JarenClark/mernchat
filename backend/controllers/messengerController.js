const User = require('../models/authModel')
const Message = require('../models/messageModel')
//const messageData = require('../models/')

const getLastMessage = async (myId, fdId) => {
    console.log(typeof(myId), typeof(fdId))
    const msg = await Message.findOne({
        $or: [{
            $and: [{
                senderId: {
                    $eq: myId
                }
            }, {
                receiverId: {
                    $eq: fdId
                }
            }]
        }, {
            $and: [{
                senderId: {
                    $eq: fdId
                }
            }, {
                receiverId: {
                    $eq: myId
                }
            }]
        }]

    }).sort({
        updatedAt: -1
    });

    console.log(`msg is `,msg)
    return msg;
}


module.exports.getFriends = async (req, res) => {

    const myId = req.myId;
    let fnd_msg = [];
    try {
        const friendGet = await User.find({
            _id: {
                $ne: myId
            }
        });
        for (let i = 0; i < friendGet.length; i++) {
            let lmsg = await getLastMessage(myId, friendGet[i]._id);
            fnd_msg = [...fnd_msg, {

                fndInfo: friendGet[i],
                msgInfo: lmsg
            }]

        }

        // const filter = friendGet.filter(d=>d.id !== myId );
        res.status(200).json({ success: true, friends: fnd_msg })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: {
                errorMessage: 'Internal Server Error'
            }
        })
    }

    // try {

    //     const friendGet = await User.find({})
    //     const others = await friendGet.filter(x => {
    //         return x._id != req.myId // remove ourself from user list
    //     })
    //     res.status(200).json({ success: true, friends: others })

    // } catch (error) {
    //     res.status(500).json({
    //         error: {
    //             errorMessage: 'Internal Server Error: Failed to fetch friends'
    //         }
    //     })

    // }

}

module.exports.sendMessage = async (req, res) => {

    const {
        senderName,
        receiverId,
        message
    } = req.body
    const senderId = req.myId;

    try {

        const insertMessage = await Message.create({
            senderId: senderId,
            senderName: senderName,
            receiverId: receiverId,
            message: {
                text: message,
                image: ''
            }
        })

        res.status(200).json({
            success: true,
            message: insertMessage
        })

    } catch (error) {
        console.log(JSON.stringify(error))
        res.status(500).json({
            error: {
                errorMessage: ['Internal Server Error']
            }
        })
    }
}

module.exports.getMessages = async (req, res) => {
    const myId = req.myId;
    const friendId = req.params.id

    try {
        let getOurMessages = await Message.find({
            $or: [{
                $and: [{
                    senderId: {
                        $eq: myId
                    }
                }, {
                    receiverId: {
                        $eq: friendId
                    }
                }]
            }, {
                $and: [{
                    senderId: {
                        $eq: friendId
                    }
                }, {
                    receiverId: {
                        $eq: myId
                    }
                }]
            }]

        })

        res.status(200).json({
            success: true,
            messages: getOurMessages
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: {
                errorMessage: 'Internal Server Error: Failed to fetch messages'
            }
        })
    }
}

module.exports.messageSeen = async (req, res) => {

}

module.exports.messageSeen = async (req, res) => {

    console.log(`messageSeen`)

    const messageId = req.body._id;

    await Message.findByIdAndUpdate(messageId, {
        status: 'seen'
    })
        .then(() => {
            res.status(200).json({
                success: true
            })
        }).catch(() => {
            res.status(500).json({
                error: {
                    errorMessage: 'Internal Server Error'
                }
            })
        })
}

module.exports.deliveredMessage = async (req, res) => {

    console.log(`deliveredMessage`)
    const messageId = req.body._id;

    await Message.findByIdAndUpdate(messageId, {
        status: 'delivered'
    })
        .then(() => {
            res.status(200).json({
                success: true
            })
        }).catch(() => {
            res.status(500).json({
                error: {
                    errorMessage: 'Internal Server Error'
                }
            })
        })
}