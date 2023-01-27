/** IMPORTS */
const express = require('express')
const cors = require('cors')
const http = require('http')
const databaseConnect = require('./config/database')
const dotenv = require('dotenv')
const PORT = process.env.PORT || 5000
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')


const authRouter = require('./routes/authRoute')
const messengerRouter = require('./routes/messengerRoute')
require('dotenv').config()

// import messengerRouter from './routes/messengerRoute'

/** OUR SERVER */
const app = express();

/** COOKIES */
app.use(cookieParser());
app.use(bodyParser.json())


/** CORS */
const corsOpts = {
    origin: [
        'https://mernchat.vercel.app',
        'http://localhost',
        'http://localhost:3000',
        'http://localhost:5000',
        '127.0.0.1',
        'http://127.0.0.1:3000'
    ],
    supportsCredentials: true,
    credentials: true,
    methods: ['GET', 'POST', 'HEAD', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: [
        'Accept',
        'credentials',
        'Access-Control-Allow-Origin',
        'Access-Control-Allow-Credentials',
        'access-control-allow-credentials',
        'Content-Type',
        'Authorization',
        'withCredentials',
        'set-cookie',
        'Set-Cookie',
        'Cookie',
        'Cache-Control',
    ],
    exposedHeaders: [
        'Access-Control-Allow-Origin',
        'Content-Type',
        'set-cookie',
        'Set-Cookie',
        'Cookie',
        'Cache-Control',
    ]
};
app.use(cors(corsOpts));


dotenv.config({
    path: 'backend/config/config.env'
})


// HOME ROUTE
app.get('/', (req, res) => {
    // console.log(`COOKIES: ${JSON.stringify(req.cookies)}`)
    res.redirect('https://mernchat.vercel.app/login')
    // res.send(`THIS IS FROM BACKEND`)
})

/** CONTROLLERS */

app.use('/api/messenger', authRouter)
app.use('/api/messenger', messengerRouter)

/** DATABASE */
databaseConnect()

/** SOCKET */
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

let users = [];
const addUser = (userId, socketId, userInfo) => {
    const checkUser = users.some(u => u.userId === userId);

    if (!checkUser) {
        users.push({ userId, socketId, userInfo });
    }
}
const userRemove = (socketId) => {
    users = users.filter(u => u.socketId !== socketId);
}

const findFriend = (id) => {
    console.log('attempting to findfriend')
    return users.find(u => u.userId === id);
}

const userLogout = (userId) => {
    users = users.filter(u => u.userId !== userId)
}

io.on('connection', (socket) => {

    console.log('Socket is connecting...')

    // add users when they login
    socket.on('addUser', (userId, userInfo) => {

        addUser(userId, socket.id, userInfo);
        io.emit('getUser', users);

        const us = users.filter(u => u.userId !== userId);
        const con = 'new_user_add';
        for (var i = 0; i < us.length; i++) {
            socket.to(us[i].socketId).emit('new_user_add', con);
        }
        console.log(`SOCKET addUser \n usercount is`, users.length)
    });

    socket.on('sendMessage', (data) => {
        console.log(`SOCKET sendMessage \n data is`, data)

        const user = findFriend(data.receiverId);

        console.log(`USERS ARE ${users.length}`)
        console.log(`USER IS ${user}`)

        // data.message  = {}
        // data.message.text = data.msg
        data.text = data.msg
        // let d = Date.now()
        // data.createdAt = d;

        console.log(`SOCKET sendMessage \n data is`, data)

        if (user !== undefined) {
            socket.to(user.socketId).emit('getMessage', data)
        }
        console.log(`SOCKET sendMessage \n data is`, data)
    })

    socket.on('messageSeen', msg => {
        const user = findFriend(msg.senderId);
        if (user !== undefined) {
            socket.to(user.socketId).emit('msgSeenResponse', msg)
        }
        console.log(`SOCKET messageSeen \n msg is`, msg)
    })

    socket.on('deliveredMessage', msg => {
        const user = findFriend(msg.senderId);
        if (user !== undefined) {
            socket.to(user.socketId).emit('msgDeliveredResponse', msg)
        }
        console.log(`SOCKET deliveredMessage \n msg is`, msg)
    })

    socket.on('seen', data => {
        const user = findFriend(data.senderId);
        if (user !== undefined) {
            socket.to(user.socketId).emit('seenSuccess', data)
        }
        console.log(`SOCKET seen \n data is`, data)
    })


    socket.on('typingMessage', (data) => {


        const user = findFriend(data.receiverId);

        console.log(`USERS ARE ${users.length}`)
        console.log(`USER IS ${user}`)


        if (user !== undefined) {
            socket.to(user.socketId).emit('typingMessageGet', {
                senderId: data.senderId,
                receiverId: data.receiverId,
                msg: data.msg

            })
        }
        console.log(`SOCKET typingMessage \n data is`, data)
    })

    socket.on('logout', userId => {
        userLogout(userId);
    })


    socket.on('disconnect', () => {
        console.log('user is disconnect... ');
        userRemove(socket.id);
        io.emit('getUser', users);
    })
})

server.listen(8000, () => {
    console.log('socket.io is listening on *:8000');
});













/** CONFIRM OUR SERVER IS RUNNING */
app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`)
})