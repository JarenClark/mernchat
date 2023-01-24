const User = require('../models/authModel')
const Message = require('../models/messageModel')
//const messageData = require('../models/')

module.exports.getFriends = async (req, res) => {

    try {

        const friendGet = await User.find({})
        const others = await friendGet.filter(x => {
            return x._id != req.myId // remove ourself from user list
        })
        res.status(200).json({ success: true, friends: others })

    } catch (error) {
        res.status(500).json({
            error: {
                errorMessage: 'Internal Server Error: Failed to fetch friends'
            }
        })

    }

}

module.exports.sendMessage = async (req, res) => {

    const {
        senderName,
        receiver,
        message
    } = req.body
    const senderId = req.myId;

    try {

        const insertMessage = await Message.create({
            senderId: senderId,
            senderName: senderName,
            receiverId: receiver,
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
                     senderId : {
                         $eq: myId
                     }
                },{
                     receiverId : {
                         $eq : friendId 
                     }
                }]
           }, {
                $and : [{
                     senderId : {
                          $eq : friendId
                     } 
                },{
                     receiverId : {
                          $eq : myId
                     }
                }]
           }]

        })

        res.status(200).json({
            success:true,
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