const mongoose = require('mongoose')
require('dotenv').config()
mongoose.set('strictQuery', false)


const databaseConnect = () => {
    console.log(`DB URL IS ${process.env.DATABASE_URL}`)
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology : true
    }).then(() => {
        console.log(`Mongodb Database Connected`)
    }).catch(error => {
        console.log(error)
    })
}


module.exports = databaseConnect