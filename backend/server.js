/** IMPORTS */
const express = require('express')
const cors = require('cors')
const databaseConnect = require('./config/database')
const dotenv = require('dotenv')
const PORT = process.env.PORT || 5000
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

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
        '127.0.0.1'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'HEAD', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: [
        'Accept',
        'credentials',
        'Access-Control-Allow-Credentials',
        'access-control-allow-credentials',
        'Content-Type',
        'withCredentials',
        'set-cookie',
        'Set-Cookie',
    ],
    exposedHeaders: [
        'Content-Type', 
        'set-cookie',
        'Set-Cookie',
    ]
};
app.use(cors(corsOpts));




const authRouter = require('./routes/authRoute')

dotenv.config({
    path: 'backend/config/config.env'
})


// HOME ROUTE
app.get('/', (req, res) => {
    // console.log(`COOKIES: ${JSON.stringify(req.cookies)}`)
    res.send(`THIS IS FROM BACKEND`)
})

/** CONTROLLERS */
app.use('/api/messenger', authRouter)

/** DATABASE */
databaseConnect()


app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`)
})