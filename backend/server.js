/** IMPORTS */
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')

/** OUR SERVER */
const app = express();

// CORS
const corsOpts = {
    origin: ['http://localhost', 'http://localhost:3000', 'http://localhost:5000', 'http://127.0.0.1'],
    credentials: true,
    methods: ['GET', 'POST', 'HEAD', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: [
        'Accept',
        'credentials',
        'Access-Control-Allow-Credentials',
        'access-control-allow-credentials',
        'Content-Type',
        'withCredentials',
        'set-cookie'
    ],
    exposedHeaders: [
        'Content-Type', 
        'set-cookie',
        
    ]
};
app.use(cors(corsOpts));


app.use(cookieParser());

const databaseConnect = require('./config/database')

const authRouter = require('./routes/authRoute')

dotenv.config({
    path: 'backend/config/config.env'
})

const PORT = process.env.PORT || 5000

// HOME ROUTE
app.get('/', (req, res) => {
    res.send(`THIS IS FROM BACKEND`)
})

app.use('/api/messenger', authRouter)

databaseConnect()


app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`)
})