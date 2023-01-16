const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

const app = express();

const corsOpts = {
    origin: '*',
    credentials: true,
    methods: ['GET','POST','HEAD','PUT','PATCH','DELETE'],
    allowedHeaders: ['Content-Type'],
    exposedHeaders: ['Content-Type']
};
app.use(cors(corsOpts));


const databaseConnect = require('./config/database')
const authRouter = require('./routes/authRoute')

dotenv.config({
    path: 'backend/config/config.env'
})

const PORT = process.env.PORT || 5000

// HOME ROUTE
app.get('/', (req,res) => {
    res.send(`THIS IS FROM BACKEND`)
})

app.use('/api/messenger', authRouter)

databaseConnect()


app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`)
})