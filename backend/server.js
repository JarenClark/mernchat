/** IMPORTS */
const express = require('express')
const cors = require('cors')
const databaseConnect = require('./config/database')
const dotenv = require('dotenv')
const PORT = process.env.PORT || 5000
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')


// import messengerRouter from './routes/messengerRoute'

/** OUR SERVER */
const app = express();

/** COOKIES */
app.use(cookieParser());
app.use(bodyParser.json())


/** CORS */ 
const corsOpts = {
    origin: [
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
    res.send(`THIS IS FROM BACKEND`)
})

/** CONTROLLERS */
const authRouter = require('./routes/authRoute')
const messengerRouter = require('./routes/messengerRoute')

app.use('/api/messenger', authRouter)
app.use('/api/messenger', messengerRouter)

/** DATABASE */
databaseConnect()


app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`)
})