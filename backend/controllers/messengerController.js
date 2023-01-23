const User = require('../models/authModel')


module.exports.getFriends = async (req, res) => {
    console.log(`req.id, ${req.myId}`)
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
    // console.log('hello from module.exports.getFriends')
    // console.log('friendGet.filter(x => x._id != req.myId)')
}

